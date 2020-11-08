function clearCanvas(can){
    if(typeof can === 'object'){
        can.width = can.width;
    } else if(typeof can === 'string') {
        document.getElementById(can).width = document.getElementById(can).width;
    } else {
        console("ERROR [clearCanvas]: please pass in either the object reference or the ID string of the canvas element");
    }
}