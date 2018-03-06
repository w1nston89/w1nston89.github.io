let game={
	pole:[],
	snake:[],
	width:20,
	height:20,
	init: function(){
		for (x=0; x<this.width; x++) {
			this.pole[x]=[];
			for (y=0; y<this.height; y++){
				this.pole[x][y]=0;
			}
		}
		this.snake[0]={x:1,y:2};
	},
	// создаем поле
	table: function(){
		document.write("<table>");
		for (i=0;i<this.width;i++){
			document.write("<tr>")
			for (k=0;k<this.height;k++){
				document.write(`<td id="${i}-${k}"></td>`);
			}
			document.write("</tr>");
		}
		document.write("</table>");
	},
	// отображение тела змейки
	view: function(){
		
		for (let i of this.snake){
			$(`#${i.x}-${i.y}`).css("background-color","black");
			console.log(i);
		}
	}
};
game.init();
game.table();
game.view();
