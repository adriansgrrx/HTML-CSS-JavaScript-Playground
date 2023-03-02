function renderLogo(){
    try {
        const canvas = document.querySelector("#canvas");
        const ctx = canvas.getContext("2d");
        let my_font = new FontFace('my_font', 'url(AvianoContrastW00Heavy.ttf)');
        my_font.load().then(function(font){
            document.fonts.add(font);
            const innerHeight = 720;
            const innerWidth = 720;
            ctx.canvas.height = innerHeight; 
            ctx.canvas.width = innerWidth;
            ctx.canvas.style.imageRendering = 'auto';
            
            // for the color red arc
            ctx.beginPath();
            ctx.arc(360, 300, 260, 0, 2 * Math.PI, true);
            ctx.fillStyle = "#eb3736";
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(360, 300, 220, 0, 2 * Math.PI, true);
            ctx.fillStyle = "#fff";
            ctx.fill();

            // for the color green arc
            ctx.beginPath();
            ctx.arc(360, 300, 180, 0, 2 * Math.PI, true);
            ctx.fillStyle = "#11ab5f";
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(360, 300, 140, 0, 2 * Math.PI, true);
            ctx.fillStyle = "#fff";
            ctx.fill();

            // for the color blue arc
            ctx.beginPath();
            ctx.arc(360, 300, 100, 0, 2 * Math.PI, true);
            ctx.fillStyle = "#1470b2";
            ctx.fill();
    
            ctx.beginPath();
            ctx.arc(360, 300, 60, 0, 2 * Math.PI, true);
            ctx.fillStyle = "#fff";
            ctx.fill();
    
            // for the black rectangle
            ctx.beginPath();
            ctx.fillStyle = "#211d1e";
            ctx.clearRect(330, 310, 60, 300);
            ctx.fillRect(340, 300, 40, 275);
            ctx.fill();    
    
            // for the ABS-CBN text
            ctx.font = "900 100px my_font";
            ctx.fillText("ABS-CBN", innerWidth/12.5, innerHeight-40);
            // for the ABS-CBN dash
            ctx.beginPath();
            ctx.fillStyle = "#211d1e";
            ctx.fillRect(342, 630, 35, 35);
            ctx.fill(); 
        });
    } catch(error) {
        alert("HTML5 Canvas is not supported in your browser.");
    };
};