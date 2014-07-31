function Q(l,c,r,C,n){
  var xx = Date.now();
  if(n==c)
    C++;
  var p=~(l|c|r)&n,b;
  while(p){
    b=p&-p;
    p-=b;
    C+=Q((l|b)<<1,c|b,(r|b)>>1,0,n);
  }
  var yy = Date.now();
  console.log(yy-xx)
  return C;
}
