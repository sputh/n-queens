function Q(leftDiag,column,rightDiag,Count,nMask){
  if (nMask == column) Count++;
  var pos=~(leftDiag|column|rightDiag)&nMask,rightmostBit;
  while(pos){
    rightmostBit=pos&-pos;
    pos^=rightmostBit;
    Count+=Q((leftDiag|rightmostBit)<<1,column|rightmostBit,(rightDiag|rightmostBit)>>1,0,nMask);
  }
  return Count;
}

var left, cols, right, nMask;
self.addEventListener('message', function(e) {
  var data = e.data;

  left = data.l;
  cols = data.c;
  right = data.r
  nMask = data.n;
  var count = Q(left,cols,right,0,nMask);
  self.postMessage({result:count});
  self.close();
});


