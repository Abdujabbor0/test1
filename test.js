const fs = require('fs')
const path = require('path')
const adres = path.join(process.cwd(),'testlar.json')
const usersadres = path.join(process.cwd(),'users.json')
let testlar = fs.readFileSync(adres,'UTF-8')
testlar = JSON.parse(testlar)
let z = 0
let a = 0
let b = 0
let c


const rl = require('readline')

const readline = rl.createInterface({
	input: process.stdin,
	output: process.stdout,
})

function askQuestionText1 () {
	readline.question('ismingizni kiriting: ', (data) => {
		if(!data) return askQuestionText1()
		c = data
		return askQuestionText(testlar[z])
	})
}
function ff (){
    readline.question('Bunday jovob yoq!!!\n', (data) => {
        if(!(('ABCD').includes(data))) return ff()
        return data
        
	})
}
function askQuestionText (arr,obj) {
    let x = ''
    for (let i of arr.options){
        x += Object.keys(i) + ')' + Object.values(i) + '\n'
    }
	readline.question(obj ? obj + '\n' : arr.text + '\n' + x + `Tog'ri jovobni kiriting:`, (data) => {
		if(!data) return askQuestionText(testlar[z])
        if(!(('ABCD').includes(data))) return askQuestionText(testlar[z],"Bunday jovob yoq!!!")
		if(data == arr.answer){
            a += 1
        }
        else{
            b += 1
        }
        if(testlar.length-1 == z){
            return wer()
        } 
		else {
            return askQuestionText(testlar[++z])
        }
	})
}


function wer(){
    let aa = fs.readFileSync(usersadres,'UTF-8')
    aa = aa ? JSON.parse(aa) : []
    let ss = {
        userName: c,
        togrijovob: a,
        notogrijovob: b,
        testlarsoni: testlar.length
    }
    aa.push(ss)
    fs.writeFileSync(usersadres,JSON.stringify(aa,null,4))
    readline.close()
}
askQuestionText1()
