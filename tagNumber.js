var genTagNum = module.exports = {
    currentTagNum: 1521,
    
    current: function(){
        genTagNum.currentTagNum = genTagNum.currentTagNum
    },
    add: function() {
        genTagNum.currentTagNum += 1;
    }
}