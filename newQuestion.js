const rl = require('readline')
const fs = require('fs')
const path = require('path')
const adres = path.join(process.cwd(),'testlar.json')
const options = ['A', 'B', 'C', 'D']
const newQuestion = {}
let index = 0

const readline = rl.createInterface({
	output: process.stdout,
	input: process.stdin,
})

function askQuestionText () {
	readline.question('Savol matnini kirit: ', (data) => {
		if(!data) return askQuestionText()
		newQuestion.text = data
		return askQuestionVariants(index)
	})
}

function askQuestionVariants (innerIndex) {
	readline.question(options[innerIndex] + ') ', data => {
		if(!data) return askQuestionVariants(innerIndex)
		newQuestion.options = newQuestion.options || []
		newQuestion.options.push({ [options[innerIndex]]: data })
		if((options.length - 1) == innerIndex) return askQuestionAnswer()
		else return askQuestionVariants(++index)
	})
}

function askQuestionAnswer () {
	readline.question('To\'g\'ri javobni kirit: ', data => {
		if(!data || !options.includes(data)) return askQuestionAnswer()
		newQuestion.answer = data
		qoshish(newQuestion)
		readline.close(newQuestion)
	})
}
function qoshish(aaa){
    let x = fs.readFileSync(adres,'UTF-8')
    x = x ? JSON.parse(x) : []
    x.push(aaa)
    fs.writeFileSync(adres,JSON.stringify(x,null,4))
    console.log('SOvolongiz Qoshildi!!!')
}

askQuestionText()