# BBS_pratice(連結資料庫的留言網站)

***

![image](https://github.com/JohnnyOfSnow/BBS_pratice/blob/master/demo_image/m85tz-jeujg.gif)

## 一、使用技術
  * HTML
  * JavaScript
  * CSS
  * JQuery(Ajax)
  * Node.js(ejs 嵌入式javascript樣板引擎)
  * MnogoDB(CRUD操作)

## 二、功能說明
  * 發表新留言：點擊該文字按鈕，會出現一個模組塊，有需要填入作者、內容的文字輸入框，以及送出、關閉的按鈕。

  `popup box(模組塊)`
  ![image](https://github.com/JohnnyOfSnow/BBS_pratice/blob/master/demo_image/popup_box.jpg)

  1.該頁面的程式碼於<head>範圍內引用下列程式碼。

  ```js
	  function toggle_visibility(id) {
	       var e = document.getElementById(id);
	       if(e.style.display == 'block')
	          e.style.display = 'none';
	       else
	          e.style.display = 'block';
	   }
  ```
  2.建立模組塊的html組件,在這裡id設為popup-box1(範圍內可以加入<label><textarea><input><button>),把它當作另一個html文件寫就好。

  ```html
	  <div id="popup-box1" class="popup-position">
	      //can add <label> <textarea> <input> <button>...
	  </div>
  ```

  3.按鈕的onclick方法指向toggle_visibility,參數指向模組塊的id。

  ```html
  onclick="toggle_visibility('popup-box1')
  ```

  4.要關閉模組塊，只要在模組塊內新增一個按鈕，然後onclick方法再次指向模組塊就好。

  ```html
  <button type="button" onclick="toggle_visibility('popup-box1');">關閉</button>
  ```