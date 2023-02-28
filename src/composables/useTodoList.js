import {ref} from 'vue';

export const useTodoList = (id) => {
    const ls = localStorage.todoList;   // ローカルストレージにtodoリストがあるか？
    const todoListRef = ref([]);
    todoListRef.value = ls ? JSON.parse(ls) : []; // lsが空だったら、空のリストを代入

    const findById =  (id) => {             // todoリストからidをもとに情報を取得
        return todoListRef.value.find((todo) => todo.id === id);
    };

    const findIndexById = (id) => {         // todoリストからidを元にインデックスを取得
        return todoListRef.value.findIndex((todo) => todo.id === id);
    }

    const add = (task) => {      // 追加ボタンが押された時
        const id = new Date().getTime();
        todoListRef.value.push({id: id, task: task});
        localStorage.todoList = JSON.stringify(todoListRef.value)
    };

    const editId = ref(-1);         // 編集ボタンが押された時         リアクティブにする
    const show = (id) => {
        editId.value = id;
        return todo.task;           // 画面処理させるために返す
    }

    const edit = (task) => {        // 変更ボタンが押された時
        const todo = findById(editId.value);
        const idx = findIndexById(editid.value);
        todo.task = task;
        todoListRef.value.splice(idx, 1, todo);
        localStorage.todoList = JSON.stringify(todoListRef.value);
        editId.value  = -1;
    }

    const del = (id) => {           // 削除ボタンが押された時
        const todo = findById(id);
        const delMsg = "「" + todo.task + "」を削除しますか？";
        if (!confirm(delMsg)) return;

        const idx =findIndexById(id);
        todoListRef.value.splice(idx, 1);   // リストからインデックスがidxのデータを削除
        localStorage.todoList = JSON.stringify(todoListRef.value);
    }

    const check = (id) => {
        const todo = findById(id);
        const idx = findIndexById(id);
        todo.checked = !todo.checked;
        todoListRef.value.splice(idx, 1, todo); // splice関数でインデックスを元に対象オブジェクトを置き換え
        localStorage.todoList = JSON.stringify(todoListRef.value); // ローカルストレージに保存
    }

    return { todoListRef, add, show, edit, del, check };
};