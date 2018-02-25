var gameVue = new Vue({
    el: 'section.game',
    data: {
        message: 'Hello Vue.js!',
        userName: '',
        enemyName: '',
        isTurn: false,
        //tictactoe boxes propertys
        boxes: [
            {
                id: '1-1',
                state: null,
            },
            {
                id: '1-2',
                state: null,
            },
            {
                id: '1-3',
                state: null,
            },
            {
                id: '2-1',
                state: null,
            },
            {
                id: '2-2',
                state: null,
            },
            {
                id: '2-3',
                state: null,
            },
            {
                id: '3-1',
                state: null,
            },
            {
                id: '3-2',
                state: null,
            },
            {
                id: '3-3',
                state: null,
            }
        ],
        boxes2: {
            '1-1': {
                id: '1-1',
                state: null
            },
            '1-2': {
                id: '1-2',
                state: null
            },
            '1-3': {
                id: '1-3',
                state: null
            },
            '2-1': {
                id: '2-1',
                state: null
            },
            '2-2': {
                id: '2-2',
                state: null
            },
            '2-3': {
                id: '2-3',
                state: null
            },
            '3-1': {
                id: '3-1',
                state: null
            },
            '3-2': {
                id: '3-2',
                state: null
            },
            '3-3': {
                id: '3-3',
                state: null
            }
        }
    },
    methods: {
        changeField: function (event, id) {

            if (this.boxes2[id].state != null) {
                console.log("Cant be changed");
                //return;
            }

            if (this.boxes2[id].state == "cross") {
                console.log(this.boxes2[id].state);
                this.boxes2[id].state = "circle";
            }
            else {
                this.boxes2[id].state = "cross";
            }
        }
    }
})