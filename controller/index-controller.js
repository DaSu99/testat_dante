//const switchStyleButton = document.querySelector('#changeStyleButton');

import {noteStore} from "../services/todo-service.js";

let isDark = true;

/*switchStyleButton.addEventListener('click', () => {
    isDark = !isDark;
    console.log('clicked')
    }
)*/

export class IndexController {
    todos = await noteStore.getAll()
    index(req, res) {
        res.render("index", {todo: this.todos, data: "Hello World", dark: isDark});
    };
}

export const indexController = new IndexController();
