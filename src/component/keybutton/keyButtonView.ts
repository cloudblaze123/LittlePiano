


class KeyButtonView{

    private static readonly template = /*html*/`
        <button className="keyboard-keybutton"></button>
    `

    private button:HTMLButtonElement;

    constructor(){
        this.button=document.createElement(KeyButtonView.template) as HTMLButtonElement;
        this.initAction(this.button);
    }

    initAction(button:HTMLButtonElement){
        button.addEventListener("click",)
    }

    onClicked(){
        
    }

}