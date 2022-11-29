let lab1 = null
function Lab1Init(root) {
    lab1 = new Lab1(root)
}

class Lab1 {
    //logic
    cssClassName = '.l1'
    cssClassFName = '.l1_f'
    itemsCollector = []
    rootItem = null
    elemsItem = null
    elemsCount = 0
    //ui
    staticElements = {}

    constructor(root) {
        this.rootItem = root.firstChild
        this.rootItem = root.lastChild
        this.itemsCollector = document.querySelectorAll(this.cssClassName)
        this.generateHtmlElements()
    }

    sum(items){
        let x = 0
        for (let n in items) {
            x += parseInt(n.nodeValue)
        }
        return x
    }
    avg(items){
        return (this.sum(items)/items.length)
    }
    min(items){
        let forMin = items.values()
        return Math.min(...forMin)
    }
    max(items){
        let forMax = items.values()
        return Math.max(...forMax)
    }

    updateItems(){
        this.itemsCollector = document.querySelectorAll(this.cssClassName)
        this.setValues()
    }
    setValues(){
        let temp = document.querySelectorAll(this.cssClassFName)
        for (let tempElement of temp) {
            switch (tempElement.id) {
                case 'sum': tempElement.nodeValue = this.sum(this.itemsCollector).toString()
                    continue
                case 'avg': tempElement.nodeValue = this.avg(this.itemsCollector).toString()
                    continue
                case 'min': tempElement.nodeValue = this.min(this.itemsCollector).toString()
                    continue
                case 'max': tempElement.nodeValue = this.max(this.itemsCollector).toString()
            }
        }
    }
    generateHtmlElements(){
        this.staticElements = {
            sum : this.rootItem.createElement("input",{value:0,id:"sum",class:this.cssClassFName}),
            avg : this.rootItem.createElement("input",{value:0,id:"avg",class:this.cssClassFName}),
            min : this.rootItem.createElement("input",{value:0,id:"min",class:this.cssClassFName}),
            max : this.rootItem.createElement("input",{value:0,id:"max",class:this.cssClassFName}),
            inp : this.elemsItem.createElement("input",{value:0,class:this.cssClassName})
        }

        this.rootItem.appendChild(this.staticElements.sum)
        this.rootItem.appendChild(this.staticElements.avg)
        this.rootItem.appendChild(this.staticElements.min)
        this.rootItem.appendChild(this.staticElements.max)

        for (this.elemsCount; this.elemsCount < 3; this.elemsCount++) {
            this.elemsItem.appendChild(this.staticElements.inp)
        }
    }
}