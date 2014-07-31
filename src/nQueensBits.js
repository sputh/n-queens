// Replace "C=n==c" with if(n==c)C++ for a faster run time
function Q(l,c,r,C,n){C=n==c;var p=~(l|c|r)&n,b;while(p){b=p&-p;p^=b;C+=Q((l|b)<<1,c|b,(r|b)>>1,0,n);}return C;}
