function Game(name) {
	this.pole=[];
	this.snake=[];
	this.width=20;
	this.height=20;
	this.direction='right';
	this.name = name;
	this.timerId = 0;
	this.pause=0;
	this.speed=500;
	this.username='';
	this.myScore=0;


	this.init= function(){
		for (let x=0; x<this.width; x++) {
			this.pole[x]=[];
			for (let y=0; y<this.height; y++){
				this.pole[x][y]=0;	
			}
		}
		this.enterUserName();
		let x = Math.floor(Math.random() * (this.width - 4)) + 2;
		let y = Math.floor(Math.random() * (this.height - 4)) + 2;
		this.snake[0]={x:x,y:y};
		this.snake[1]={};
		this.move();

		this.randomFood();
	}
	// функция запроса имени
	this.enterUserName=function(){
		this.username=prompt('Ваше имя','');
	}
	// создаем поле
	this.table= function(){
		document.write("<table>");
		for (i=0;i<this.width;i++){
			document.write("<tr>")
			for (k=0;k<this.height;k++){
				document.write(`<td id="${this.name}-${k}-${i}"></td>`);
			}
			document.write("</tr>");
		}
		document.write("</table>");
	}
	this.view= function(){
		// отображение еды
		for (i=0;i<20;i++){
			for (k=0;k<20;k++){
				if (this.pole[i][k]){
					$(`#${this.name}-${i}-${k}`).css({'background-image':'url(img/food.png)','background-repeat':'no-repeat','background-color':'#E7E7E7'});
				}
				else{
					$(`#${this.name}-${i}-${k}`).css({'background-color':'#E7E7E7','background-image':'none'});
				}
			}
		};
		// отображение тела змейки
		for (let i of this.snake){
			$(`#${this.name}-${i.x}-${i.y}`).css("background-color","#6F8FA1");
			console.log(i);
		};
		//вывод длины змейки
		this.currentSnakeLength();
		// вывод заработанных очков
		this.currentScore();
	}
	// функция вывода длины змейки
	this.currentSnakeLength=function(){
		let snakeLength=this.snake.length;
		document.getElementById('current-length').innerHTML = "<span id='snake-length'>" + snakeLength + "</span>";
	}
	// функция вывода заработанных очков
	this.currentScore=function(){
		this.myScore=(this.snake.length-2)*10;
		document.getElementById('myScore').innerHTML = this.myScore;
	}
	
	// Движение змейки
	this.move= function(){
		// Задаем голову змеи
		let head={x:this.snake[0].x, y:this.snake[0].y};
		// Перемещаем змею
		switch (this.direction) {
			case 'up':
			head.y--;
			break;
			case 'right':
			head.x++;
			break;
			case 'down':
			head.y++;
			break;
			case 'left':
			head.x--;
		};
		// врезание змейки самой в себя
		for(let i of this.snake){
			if ((head.x===i.x) && (head.y===i.y)){
				alert('ТЫДЫЫЫЫЫЩЩЩ');
				$.post('/score',{name:this.username,score:this.myScore});//отправка результатов игры в файл bestScore.json
				window.location.reload();//перезагрузка игры(страницы)
			}
		};
		// Проверка границ поля
		if(head.x>=this.width){
			head.x=0;
		}
		else if(head.x<0){
			head.x=this.width-1;
		};
		if(head.y>=this.height){
			head.y=0;
		}
		else if(head.y<0){
			head.y=this.height-1;
		};
		// Добавляем элемент в начало
		this.snake.unshift(head);
		// поедание еды
		if(this.pole[head.x][head.y]==0){
			// Убираем элемент с конца
			this.snake.pop();
		}
		else{
			this.pole[head.x][head.y]=0;
			// случайная генерация ячейки с едой после проверки на наличие тела змейки по заданым координатам
			this.randomFood();
		};
	};
	// функция генерации случайной ячейки с едой после проверки на наличие в данных ячейках тела змейки
	this.randomFood = function(){
		
		let foodX;
		let foodY;
		let allbad;

		do{
			foodX = Math.floor( Math.random( ) * (this.width - 1) ) + 1;
			foodY = Math.floor( Math.random( ) * (this.height - 1) ) + 1;
			allbad=false;
			for(let i of this.snake){
				if((i.x===foodX)&&(i.y===foodY)){
					allbad=true;
				}
			}
		}
		while(allbad);
		this.pole[foodX][foodY]=1;
	};
	// функция присвоения кнопкам на клавиатуре возможности изменять направление движения змейки
	this.key = function(event){
		if (event.key === 'ArrowUp') {
			this.direction='up';
		}
		else if (event.key === 'ArrowRight') {
			this.direction='right';
		}
		else if (event.key === 'ArrowDown') {
			this.direction='down';
		}
		else if (event.key === 'ArrowLeft') {
			this.direction='left';
		}
		// присваиваем кнопке "р(англ.)" на клавиатуре фунцию паузы игры
		else if(event.key === 'p') {
			if(this.pause) {
				this.pause=0;
				this.timerId = setInterval(()=>{
					this.move();
					this.view();
				},this.speed);
			}
			else {
				this.pause=1;
				clearInterval(this.timerId);
				
			}
		}
	};
};

let game=new Game('game1');

game.init();
game.table();
game.view();
document.addEventListener("keydown",() => game.key(event));
game.timerId = setInterval(function(){
	game.move();
	game.view();
},500);
$.getJSON('/score', (data)=>{
	console.log(data);
});


// let game2=new Game('game2');

// game2.init();
// game2.table();
// game2.view();
// document.addEventListener("keydown",() => game2.key(event));
// timerId2 = setInterval(function(){
// 	game2.move();
// 	game2.view();
// },500);