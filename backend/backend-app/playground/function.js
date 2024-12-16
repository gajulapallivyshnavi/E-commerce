
//pass by value
// let n=10
// function change(n){
//     n=100
//     console.log(n)
// }
// console.log(n)
// change(n)
// console.log(n)
 

//pass by reference
const arr=[10]
function change(arr){
    console.log("inside before change", arr)
    arr[0]=100
    console.log(arr)
}
console.log("before chnage",arr)
change(arr)
console.log("after change",arr)
