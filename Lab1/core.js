let lab1 = null
let controler = 0
function Lab1Init(root) {
    lab1 = new Lab1(root)
}
function Lab1AddField(){
    lab1.addItem()
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
    staticElements = {
        sum : this.sumInit(),
        avg : this.avgInit(),
        min : this.minInit(),
        max : this.maxInit(),
        inp : this.impInit()
    }

    constructor(root) {
        if(controler === 0){
            controler += 1
            this.rootItem = root.children[0]
            this.elemsItem = root.children[1]
            this.itemsCollector = document.querySelectorAll(this.cssClassName)
            this.generateHtmlElements()
        }

    }
    impInit(){
        let temp = document.createElement('input')
        temp.type       = 'number'
        temp.value      = '0'
        temp.className  = this.cssClassName
        return temp
    }
    sumInit(){
        let temp = document.createElement('input')
        temp.type       = 'number'
        temp.id         = 'sum'
        temp.value      = '0'
        temp.className  = this.cssClassFName
        return temp
    }
    avgInit(){
        let temp = document.createElement('input')
        temp.type       = 'number'
        temp.id         = 'avg'
        temp.value      = '0'
        temp.className  = this.cssClassFName
        return temp
    }
    minInit(){
        let temp = document.createElement('input')
        temp.type       = 'number'
        temp.id         = 'min'
        temp.value      = '0'
        temp.className  = this.cssClassFName
        return temp
    }
    maxInit(){
        let temp = document.createElement('input')
        temp.type       = 'number'
        temp.id         = 'max'
        temp.value      = '0'
        temp.className  = this.cssClassFName
        return temp
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
        this.rootItem.appendChild(this.staticElements.sum)
        this.rootItem.appendChild(this.staticElements.avg)
        this.rootItem.appendChild(this.staticElements.min)
        this.rootItem.appendChild(this.staticElements.max)

        let t = []
        for (this.elemsCount; this.elemsCount < 3; this.elemsCount++) {
            t.push(this.staticElements.inp)
        }
        this.elemsItem.append(...t)
    }
    addItem(){
        this.elemsItem.append(this.staticElements.inp)
    }
}