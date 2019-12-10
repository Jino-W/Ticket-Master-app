const a=[1,1,2,3,4,5,5]

a.forEach((item,index)=>{
    if(a.indexOf(item) !== a.lastIndexOf(item)){
        a.splice(index,1)
    }
})

console.log(a)