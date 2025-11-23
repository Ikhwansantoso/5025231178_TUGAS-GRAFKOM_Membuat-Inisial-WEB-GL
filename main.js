function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // Mendefinisikan objek apa saja yang akan digambar
    const objectsToDraw = [
        { data: { vertices: I_vertices, indices: I_indices, colors: I_colors }, translation: [-0.75, 0.0, 0.0] },
        { data: { vertices: K_vertices, indices: K_indices, colors: K_colors }, translation: [-0.25, 0.0, 0.0] },
        { data: { vertices: H_vertices, indices: H_indices, colors: H_colors }, translation: [0.25, 0.0, 0.0] },
        { data: { vertices: N7_vertices, indices: N7_indices, colors: N7_colors }, translation: [0.75, 0.0, 0.0] }
    ];
    
    // Membuat buffer untuk setiap objek
    objectsToDraw.forEach(obj => {
        // Vertex Buffer
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.data.vertices), gl.STATIC_DRAW);
        
        // Color Buffer
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.data.colors), gl.STATIC_DRAW);

        // Index Buffer
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(obj.data.indices), gl.STATIC_DRAW);

        obj.buffers = {
            vertexBuffer: vertexBuffer,
            colorBuffer: colorBuffer,
            indexBuffer: indexBuffer,
            indexCount: obj.data.indices.length
        };
    });


    var vertexShaderCode = document.getElementById("vertexShaderCode").text;
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = `
        precision mediump float;
        varying vec3 vColor;
        void main(){
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    var aPos = gl.getAttribLocation(program, "aPosition");
    var aColor = gl.getAttribLocation(program, "aColor");
    var uFormMatrix = gl.getUniformLocation(program, 'uFormMatrix');

    var angle = 0;
    function render() {
        if (!freeze) {
            angle += 0.10;
        }

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clearColor(0.1, 0.1, 0.1, 1.0); // Warna background abu-abu terang
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Membuat matriks rotasi global
        let rotXMatrix = rotateX(angle * 0.5);
        let rotYMatrix = rotateY(angle * 0.7); 
        let globalRotationMatrix = multiplyMatrices(rotYMatrix, rotXMatrix);

        // Loop untuk menggambar setiap objek
        objectsToDraw.forEach(obj => {
            // Membuat matriks translasi spesifik untuk objek ini
            let transMatrix = translation(obj.translation[0], obj.translation[1], obj.translation[2]);
            
            // Menggabungkan rotasi global dengan translasi objek
            // Urutan penting: translasi dulu, baru rotasi agar objek berputar di posisinya
            let finalMatrix = multiplyMatrices(globalRotationMatrix, transMatrix);

            // Kirim matriks final ke shader
            gl.uniformMatrix4fv(uFormMatrix, false, finalMatrix);

            // Bind buffer vertex
            gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffers.vertexBuffer);
            gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aPos);

            // Bind buffer warna
            gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffers.colorBuffer);
            gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aColor);

            // Bind buffer index dan gambar objek
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.buffers.indexBuffer);
            gl.drawElements(gl.TRIANGLES, obj.buffers.indexCount, gl.UNSIGNED_SHORT, 0);
        });

        window.requestAnimationFrame(render);
    }

    render();
}