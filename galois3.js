function cmp(a,b){
	if (a[0]===b[0] && a[1]===b[1] && a[2]===b[2]) return 1;
	return 0;
}
function gasestelit(a,b){
	if (a===b) return 1;
	return 0;
}

function galois3()
{
	var struct={};
	struct.litera=[' ','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	struct.litera_cod=[[0,0,0],[0,0,1],[0,0,2],[0,1,0],[0,1,1],[0,1,2],[0,2,0],[0,2,1],[0,2,2],[1,0,0],[1,0,1],[1,0,2],[1,1,0],[1,1,1],[1,1,2],[1,2,0],[1,2,1],[1,2,2],[2,0,0],[2,0,1],[2,0,2],[2,1,0],[2,1,1],[2,1,2],[2,2,0],[2,2,1],[2,2,2]];
	struct.f=[0,3,9,5,15,23,13,17,20,4,12,14,11,2,6,18,7,21,16,26,22,10,8,24,25,19,1];
	struct.t=[[0,0,0],[0,1,0],[1,0,0],[0,1,2],[1,2,0],[2,1,2],[1,1,1],[1,2,2],[2,0,2],[0,1,1],[1,1,0],[1,1,2],[1,0,2],[0,0,2],[0,2,0],[2,0,0],[0,2,1],[2,1,0],[1,2,1],[2,2,2],[2,1,1],[1,0,1],[0,2,2],[2,2,0],[2,2,1],[2,0,1],[0,0,1]];
	struct.a=[]; struct.a[0]=[0,0,0];
	struct.b=[]; struct.b[0]=[0,0,0];
	struct.y=[]; struct.y[0]=[0,0,0];
	struct.x=[]; struct.x[0]=[0,0,0];
	//console.log(struct.f.length);
	var txt="";
	txt=document.getElementById('a1').value;
	struct.a[1]=JSON.parse(txt);
	txt=document.getElementById('a2').value;
	struct.a[2]=JSON.parse(txt);
	///la a-uri adunam fiecare bucatica (din cele 3 numere, de ex a[1][0]+a[2][0]=a[3][0])
	///progresiv, gen 1+2=3, 2+3=4 etc
	txt=document.getElementById('b1').value;
	struct.b[1]=JSON.parse(txt);
	txt=document.getElementById('b2').value;
	struct.b[2]=JSON.parse(txt);
	///la b-uri, cauta index-ul care reprezinta structura [x,x,x] in f
	///de exemplu, pentru [0,1,0] avem 3, adunam cu un alt index
	var m,n,p,q;
	txt=document.getElementById('txt').value;
	txt=txt.toUpperCase();
	//console.log(txt)
	if (txt.length>26) n=26;
	else n=txt.length;
	for (let i=3; i<=n; i++){
		struct.a[i]=[0,0,0];
		struct.b[i]=[0,0,0];
		for (let j=0; j<=2; j++){
			struct.a[i][j]=(struct.a[i-1][j]+struct.a[i-2][j])%3;
		}
		m=struct.b[i-1];
		q=struct.b[i-2];
		for (let j=1; j<=26; j++){
			if (cmp(m,struct.t[j])===1) {
				m=j; j=26;
			}
		}
		for (let j=1; j<=26; j++){
			if (cmp(q,struct.t[j])===1) {
				q=j; j=26;
			}
		}
		p=m+q;
		if (p>26) p%=26;
		struct.b[i]=struct.t[p];
	}
	var k="";
	var w;
	//console.log(struct.a);
	//console.log(struct.b);
	///avem a si b calculate, acum extragem string-ul ne-codat
	///si il codificam litera cu litera
	document.getElementsByName('result2')[0].value+='(a)\t';
	for (i=0; i<txt.length; i++)
		document.getElementsByName('result2')[0].value+=txt[i]+'\t';
	document.getElementsByName('result2')[0].value+='\n(b)\t'
	for (i=0; i<txt.length; i++)
		for (j=1; j<=26; j++){
			if (gasestelit(struct.litera[j],txt[i])===1){
				m=j; j=26;
				document.getElementsByName('result2')[0].value+=m+'\t';
			}
		}
	document.getElementsByName('result2')[0].value+='\n(c)\t'
	for (i=0; i<txt.length; i++)
		for (j=1; j<=26; j++){
			if (gasestelit(struct.litera[j],txt[i])===1){
				m=j; j=26; k="("+struct.litera_cod[m][0]+","+struct.litera_cod[m][1]+","+struct.litera_cod[m][2]+")"; 
				document.getElementsByName('result2')[0].value+=k+'\t';
			}
		}
	document.getElementsByName('result2')[0].value+='\n(d)\t'
	for (i=0; i<txt.length; i++)
		for (j=1; j<=26; j++){
			if (gasestelit(struct.litera[j],txt[i])===1){
				m=j;
				for (w=1; w<=26; w++)
					if (cmp(struct.litera_cod[m],struct.t[w])===1){
						document.getElementsByName('result2')[0].value+=w+'\t';
						w=26;
					}
				j=26;
			}
		}
	document.getElementsByName('result2')[0].value+='\n(e)\t';
	for (i=1; i<=txt.length; i++){
		k="("+struct.a[i][0]+","+struct.a[i][1]+","+struct.a[i][2]+")"; 
		document.getElementsByName('result2')[0].value+=k+'\t';
	}
	document.getElementsByName('result2')[0].value+='\n(f)\t';
	for (i=1; i<=txt.length; i++){
		for (j=1; j<=26; j++){
			if (cmp(struct.a[i],struct.t[j])===1){
				document.getElementsByName('result2')[0].value+=j+'\t';
				j=26;
			}
		}
	}
	document.getElementsByName('result2')[0].value+='\n(g)\t';
	for (i=1; i<=txt.length; i++){
		k="("+struct.b[i][0]+","+struct.b[i][1]+","+struct.b[i][2]+")"; 
		document.getElementsByName('result2')[0].value+=k+'\t';
	}
	document.getElementsByName('result2')[0].value+='\n(h)\t'
	var output="";
	for (i=0; i<txt.length; i++){
		struct.y[i+1]=[0,0,0];
		///y=a*x+b;
		for (j=1; j<=26; j++){
			if (gasestelit(struct.litera[j],txt[i])===1){
				m=j; j=26;
			}
		}
		///in m se afla pozitia j a literei;
		///acum avem polinomiala cu f_i = m
		for (j=1; j<=26; j++){
			if (m===struct.f[j]){
				m=j; j=26;
			}
		}
		///deci m=x
		
		for (j=1; j<=26; j++){
			if (cmp(struct.t[j],struct.a[i+1])===1) {
				n=j; j=26;
			}
		}
		///am luat codul din a (t^n)
		///deci n=a
		
		p=m+n;
		if (p>26) p%=26;
		///am inmultit a si x, si acum avem prima parte din y
		///y=a*x=t^(a+x)
		
		//for (j=1; j<=26; j++){
			//if (p===struct.f[j]) {
				//q=j; j=26;
			//}
		//}
		
		///am obtinut polinomiala primei parti a lui y ()
		
		for (j=0; j<=2; j++){
			struct.y[i+1][j]=(struct.t[p][j]+struct.b[i+1][j])%3;
		}
		//console.log(struct.y[i+1]);
		///am adaugat polinomialele si am obtinut y final;
		//console.log(struct.y[i+1]);
		for (j=1; j<=26; j++){
			if (cmp(struct.y[i+1],struct.litera_cod[j])===1) {
				m=j; j=26;
			}
		}
		//console.log(m);
		document.getElementsByName('result2')[0].value+=m+'\t';
		output+=struct.litera[m];
		
	}
	//console.log(output);
	document.getElementsByName('result2')[0].value+='\n(i)\t';
	for (i=0; i<output.length; i++){
		document.getElementsByName('result2')[0].value+=output[i]+'\t';
	}
	document.getElementsByName('result')[0].value=output;
}