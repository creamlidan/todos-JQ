(function ($) {
	'use strict';

	// Your starting point. Enjoy the ride!
	// 1.数据表结构
	//   name  完成状态
	var data = {
		todoStorage:[
		{
			"name":"抽烟",
			"completed":true,
		}]
	}

	init(data.todoStorage);

	// 2.初始化数据(每当数据有改动时)
	function init(todoStorages){
		$(".todo-list").empty();
		if(!todoStorages.length){
			$('.footer').hide();
		}else{
			$('.footer').show();
			var str= "";
			// 1.1 循环渲染出已有条数
			for( var i = todoStorages.length-1;  i>=0; i-- ){
				str += '<li '+(todoStorages[i].completed ? "class ='completed'" : " ")+' data-idx = '+i+'>\
        	    <div class="view">\
        	      <input class="toggle" type="checkbox" '+(todoStorages[i].completed ? "checked" : " ")+'>\
        	      <label>'+ todoStorages[i].name +'</label>\
        	      <button class="destroy"></button>\
        	    </div>\
        	    <input class="edit" value="Create a TodoMVC template">\
        	  </li>';
			}
      $(".todo-list").append(str);

      //绑定删除事件
      $(".destroy").on("click",function(){
      	removeTodoStorage($(this).parents("li").attr("data-idx"));
      })

      //绑定切换完成状态事件
      $(".toggle").on("click",function(){
      	getTodoStorage($(this).parents("li").attr("data-idx"));
      })

      //条数更新
      if( todoStorages.length == 1 ){
      	$(".todo-count").html("<strong>"+ todoStorages.length +"</strong> item left");
      }else{
      	$(".todo-count").html("<strong>"+ todoStorages.length +"</strong> items left");
      }
		}
	}


	// 3. 数据操作

	/*
	* 3.1. 新增数据
	* @name 为新数据的内容
	* @callback 为回调函数
	*/

	function addItems(name,callback){
		data.todoStorage.push({
			"name":name,
			"completed":false,
		})
		callback && callback();
		init(data.todoStorage);
	}

	/*
	* 3.2. 删除数据
	* @index为数组索引
	*/

	function removeTodoStorage(index){
		data.todoStorage.splice(index,1);
		init(data.todoStorage);
	}

	/*
	* 3.3.修改数据
	* @index为数组索引
	*/
	function getTodoStorage(index){
		if(index){
			data.todoStorage[index].completed = !data.todoStorage[index].completed;
			init(data.todoStorage);
			return;
		}
		var isCompletes = true;//假设所有的都是完成的
		for( var i = data.todoStorage.length-1;  i>=0; i-- ){
			if(!data.todoStorage[i].completed){
				isCompletes = false;
			}
		}
		
		if(!isCompletes){
			for( var i = data.todoStorage.length-1;  i>=0; i-- ){
				data.todoStorage[i].completed = true;
			}
		}
		else{
			for( var i = data.todoStorage.length-1;  i>=0; i-- ){
				data.todoStorage[i].completed = false;
			}
		}
		init(data.todoStorage);
	}


	/*
	* 3.4.查询数据
	* @par为要查询项目的值(true为完成项目, all为所有项目)
	*/
	function queryTodoStorage(par){
		var newTodoStorages = [];
		//已完成状态查询
		if(par){
			for( var i = data.todoStorage.length-1;  i>=0; i-- ){
				if( data.todoStorage[i].completed ){
					newTodoStorages.push(data.todoStorage[i]);
				}
			}
		}
		// 未完成转态查询
		else{
			for( var i = data.todoStorage.length-1;  i>=0; i-- ){
				if( !data.todoStorage[i].completed ){
					newTodoStorages.push(data.todoStorage[i]);
				}
			}
		}
		//全部查询
		par === "all" ? init(data.todoStorage) : init(newTodoStorages);
	}

	// 4.1为输入框绑定事件
	var newtTodo = $(".new-todo");
	newtTodo.on("keyup",function(e){
		//判断值
		if(e.which !== 13) return;
		if(!newtTodo.val()){
			alert("请输入内容");
			return;
		}
		addItems(newtTodo.val(),function(){
			newtTodo.val("");
		});
	})

	// 4.2清除全部已经完成的项目
	$(".clear-completed").on("click",function(){
		$(".filters li").eq(0).click();
			for( var i = data.todoStorage.length-1;  i>=0; i-- ){
				if( data.todoStorage[i].completed ){
					removeTodoStorage(i);
				}
			}
	})

	// 4.3查看所有项目
	$(".filters li").eq(0).on("click",function(){
		queryTodoStorage("all");
		$(this).find("a").addClass("selected")
		$(this).siblings().find('a').removeClass("selected");
	})

	// 4.3只查看所有正在进行的项目
	$(".filters li").eq(1).on("click",function(){
		queryTodoStorage(false);
		$(this).find("a").addClass("selected")
		$(this).siblings().find('a').removeClass("selected");
	})

// 4.3只查看所有完成的项目
	$(".filters li").eq(2).on("click",function(){
		queryTodoStorage(true);
		$(this).find("a").addClass("selected")
		$(this).siblings().find('a').removeClass("selected");
	})

	//切换全部任务的完成转态
	$(".toggle-all").on("click",function(){
		getTodoStorage();
	})


})(jQuery);
