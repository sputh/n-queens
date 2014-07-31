function Q(leftDiag,column,rightDiag,Count,nMask){
  if (nMask == column) Count++;
  var pos=~(leftDiag|column|rightDiag)&nMask,rightmostBit;
  while(pos){
    rightmostBit=pos&-pos;
    pos^=rightmostBit;
    Count+=Q((leftDiag|rightmostBit)<<1,column|rightmostBit,(rightDiag|rightmostBit)>>1,0,nMask);
  }
  return Count;
};

function QMother(leftDiag,column,rightDiag,Count,n){
  var start = Date.now();
  var nMask = (1<<n)-1;
  var numWorkers = Math.ceil(n/2);
  var pos=~(leftDiag|column|rightDiag)&nMask, rightmostBit, worker, heardFrom = 0;
  while(pos){
    rightmostBit=pos&-pos;
    pos^=rightmostBit;
    worker = new Worker('nQueensWorker.js');
    worker.addEventListener('message', function(e) {
      var data = e.data;
      Count += data.result;
      heardFrom++;
      if (heardFrom == numWorkers) {
        console.log("QMother run time for "+n+": " + (Date.now()-start));
        console.log("QMother result for "+n+": "+Count);
      }
    }, false);
    worker.postMessage({
      l:(leftDiag|rightmostBit)<<1,
      c:column|rightmostBit,
      r:(rightDiag|rightmostBit)>>1,
      n:nMask
    });

    rightmostBit=pos&-pos;
    pos^=rightmostBit;
    if (rightmostBit) {
      Count += Q((leftDiag|rightmostBit)<<1,column|rightmostBit,(rightDiag|rightmostBit)>>1,0,nMask);
    }
  }
}


