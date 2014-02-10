var tadJS = {

/*****************************************
Author: Abraham A.
Copyright: (c) 2007-2014 tadxl.com

This financial functions library for JavaScript is based on financial 
functions found in tadXL add-in for Excel 2007, 2010 and 2013.

tadXL functions were developed over an extended period of 6 years 
based on authors research into algorithms for financial analysis 
that were originally developed as online calculators at thinkanddone.com

The prefix "tad" in tadJS and tadXL is made from the initials of 
authors flagship site thinkanddone.com 

There are over 100 financial functions in this library that will be added 
piecemeal to tadJS

*****************************************/


tadAEY: function(r, c)
{
	if (r==0.0)
		return 0.0;
	if (c==0.0)
		return Math.exp(r) - 1;
	else
		return Math.pow(1.0+r*c, 1/c) - 1;
},

tadEFFECT: function(r, c)
{
	if (r==0.0)
		return 0.0;
	if (c==0.0)
		return Math.exp(r)-1;
	else
		return Math.pow(1.0+r,1/c) - 1;
},

tadNOMINAL: function(r, c)
{
	if (r==0.0)
		return 0.0;
	if (c==0.0)
		return Math.log(1+r);
	else
		return (Math.pow(1.0+r,c) - 1)/c;
},

tadPVIF: function(r, n, c)
{
	c = (typeof c !== "undefined") ? c : 1;
	if (r==0.0)
		return 1.0;
	if (n==0.0)
		return 1.0;
	return Math.pow(1.0+this.tadAEY(r,c),-n);
},

tadPVIFbar: function(r, n, c)
{
	c = (typeof c !== "undefined") ? c : 1;
	if (r==0.0)
		return -n;
	if (n==0.0)
		return 0.0;
	return -n * this.tadPVIF(r,n+c,c);
},

tadFVIF: function(r, n, c)
{
	c = (typeof c !== "undefined") ? c : 1;
	if (r==0.0)
		return 1.0;
	if (n==0.0)
		return 1.0;
	return Math.pow(1.0+this.tadAEY(r,c),n);
},


tadFVIFbar: function(r, n, c)
{
	c = (typeof c !== "undefined") ? c : 1;
	if (r==0.0)
		return n;
	if (n==0.0)
		return 0.0;
	return n * this.tadFVIF(r,n-c,c);
},

tadPVIF2: function(r, n, c, p, d)
{
	var t=0.0;
	c = (typeof c !== "undefined") ? c : 1;
	p = (typeof p !== "undefined") ? p : 1;
	d = (typeof d !== "undefined") ? d : 1;

	t = (n-1)*p+d*p;
	if (r==0.0)
		return 1.0;
	if (t==0.0)
		return 1.0;
	return this.tadPVIF(r,t,c);
},

tadPVIF2bar: function(r, n, c, p, d)
{
	var t=0.0;
	c = (typeof c !== "undefined") ? c : 1;
	p = (typeof p !== "undefined") ? p : 1;
	d = (typeof d !== "undefined") ? d : 1;

	t = (n-1)*p+d*p;
	if (r==0.0)
		return -t;
	if (t==0.0)
		return 0.0;
	return -t * this.tadPVIF(r,t+c,c);
},

tadFVIF2: function(r, n, c, p, d)
{
	var t=0.0;
	c = (typeof c !== "undefined") ? c : 1;
	p = (typeof p !== "undefined") ? p : 1;
	d = (typeof d !== "undefined") ? d : 1;

	t = (n-1)*p+d*p;
	if (r==0.0)
		return 1.0;
	if (t==0.0)
		return 1.0;
	return this.tadFVIF(r,t,c);
},

tadFVIF2bar: function(r, n, c, p, d)
{
	var t=0.0;
	c = (typeof c !== "undefined") ? c : 1;
	p = (typeof p !== "undefined") ? p : 1;
	d = (typeof d !== "undefined") ? d : 1;

	t = (n-1)*p+d*p;
	if (r==0.0)
		return t;
	if (t==0.0)
		return 0.0;
	return t * this.tadFVIF(r,t-c,c);
},

DaysBetween: function(t1, t2) {
    var oneDay = 24*60*60*1000;
    return Math.round(Math.abs((t1.getTime() - t2.getTime())/oneDay));
},

tadNPV: function(r, cfs, atype, c, p, d) {
    var npv = 0.0;
    var cf;
    var i,t;
    atype = (typeof atype !== "undefined") ? atype : 1;
    c = (typeof c !== "undefined") ? c : 1;
    p = (typeof p !== "undefined") ? p : 1;
    d = (typeof d !== "undefined") ? d : 1;

    for (i=0; i< cfs.length; i++) {
	if (atype == 0)
		t = i*p+d*p;
	else
	{
		if (i==0)
			t = 0;
		else
			t = (i-1)*p+d*p;
	}
        cf = cfs[i];
        npv += cf * this.tadPVIF(r, t, c);
    };
    return npv;
},

tadNPVbar: function(r, cfs, atype, c, p, d) {
    var npv = 0.0;
    var cf;
    var i,t;
    atype = (typeof atype !== "undefined") ? atype : 1;
    c = (typeof c !== "undefined") ? c : 1;
    p = (typeof p !== "undefined") ? p : 1;
    d = (typeof d !== "undefined") ? d : 1;

    for (i=0; i< cfs.length; i++) {
	if (atype == 0)
		t = i*p+d*p;
	else
	{
		if (i==0)
			t = 0;
		else
			t = (i-1)*p+d*p;
	}
        cf = cfs[i];
        npv += cf * this.tadPVIFbar(r, t, c);
    };
    return npv;
},

tadNFV: function(r, cfs, atype, c, p, d) {
    var n;
    atype = (typeof atype !== "undefined") ? atype : 1;
    c = (typeof c !== "undefined") ? c : 1;
    p = (typeof p !== "undefined") ? p : 1;
    d = (typeof d !== "undefined") ? d : 1;
    n = cfs.length;
    npv = this.tadNPV(r, cfs, atype, c, p, d);
    nfv = npv * this.tadFVIF(r, n, c);
    return nfv;
},

tadNFVbar: function(r, cfs, atype, c, p, d) {
    var n;
    atype = (typeof atype !== "undefined") ? atype : 1;
    c = (typeof c !== "undefined") ? c : 1;
    p = (typeof p !== "undefined") ? p : 1;
    d = (typeof d !== "undefined") ? d : 1;
    n = cfs.length;
    npv = this.tadNPVbar(r, cfs, atype, c, p, d);
    nfv = npv * this.tadFVIF(r, n, c);
    return nfv;
},

tadXNPV: function(r, data_values, c) {
    var npv = 0.0;
    c = (typeof c !== "undefined") ? c : 1;
    var t0 = new Date(data_values[0].T);
    for (var key in data_values) {
        var current = data_values[key];
        var cf = current.CF;
        var t = new Date(current.T);
        npv += cf * this.tadPVIF(r, this.DaysBetween(t0, t)/365, c);
    };
    return npv;
},

tadXNPVbar: function(r, data_values, c) {
    var npv = 0.0;
    c = (typeof c !== "undefined") ? c : 1;
    var t0 = new Date(data_values[0].T);
    for (var key in data_values) {
        var current = data_values[key];
        var cf = current.CF;
        var t = new Date(current.T);
    npv += cf * this.tadPVIFbar(r, this.DaysBetween(t0, t)/365, c);
    };
    return npv;
},

tadXIRR: function(data_values, guess,c) {
    guess = (typeof guess === "undefined") ? 0.10 : guess;
    c = (typeof c !== "undefined") ? c : 1;
    var i;
    var x = 0.0;
    var x0 = guess;
    var f;
    var fbar;


    for (i=0; i<100; i++)
    {
       f = this.tadXNPV(x0, data_values,c);
       fbar = this.tadXNPVbar(x0, data_values,c);

       if (fbar == 0.0)
          return null;
       else
          x = x0 - f/fbar;

       if ( Math.abs(x-x0) < 0.000001 )
          return x;

       x0 = x;
    };

    return null;
},

tadIRR: function(cfs, atype, guess, c, p, d) {
    guess = (typeof guess === "undefined") ? 0.10 : guess;
    atype = (typeof atype !== "undefined") ? atype : 1;
    c = (typeof c !== "undefined") ? c : 1;
    p = (typeof p !== "undefined") ? p : 1;
    d = (typeof d !== "undefined") ? d : 1;

    var i;
    var x = 0.0;
    var x0 = guess;
    var f;
    var fbar;

    for (i=0; i<100; i++)
    {
       f = this.tadNPV(x0, cfs, atype, c, p, d);
       fbar = this.tadNPVbar(x0, cfs, atype, c, p, d);

       if (fbar == 0.0)
          return null;
       else
          x = x0 - f/fbar;

       if ( Math.abs(x-x0) < 0.000001 )
          return x;

       x0 = x;
    };

    return null;
},

tadIRR2: function(cfs, atype, guess, c, p, d) {
    guess = (typeof guess === "undefined") ? 0.10 : guess;
    atype = (typeof atype !== "undefined") ? atype : 1;
    c = (typeof c !== "undefined") ? c : 1;
    p = (typeof p !== "undefined") ? p : 1;
    d = (typeof d !== "undefined") ? d : 1;

    var i;
    var x = 0.0;
    var x0 = guess;
    var f;
    var fbar;

    for (i=0; i<100; i++)
    {
       f = this.tadNFV(x0, cfs, atype, c, p, d);
       fbar = this.tadNFVbar(x0, cfs, atype, c, p, d);

       if (fbar == 0.0)
          return null;
       else
          x = x0 - f/fbar;

       if ( Math.abs(x-x0) < 0.000001 )
          return x;

       x0 = x;
    };

    return null;
}

};


/*

// Sample tests for tadJS functions
// Following statements allow you to see test results for the functions
// in tadJS by opening the accompanying tadJS.html file in your browser
// To see the result, please remove the outer comment delimeters "/*" and "*/"

var data_values = [];
data_values.push({CF: -1000, T: "2012-01-01"});
data_values.push({CF: 500, T: "2013-01-01"});
data_values.push({CF: 400, T: "2014-01-01"});
data_values.push({CF: 300, T: "2015-01-01"});
data_values.push({CF: 100, T: "2016-01-01"});
var cfs = [-1000,500,400,300,100];

document.write( "PVIF(10%, 10, 1, 1, 1) = " + tadJS.tadPVIF2(0.10,10) );
document.write("<br/>");
document.write( "PVIF(10%, 10, 1, 1/2, 1) = " + tadJS.tadPVIF2(0.10,10,undefined,0.5) );
document.write("<br/>");
document.write( "PVIF(10%, 10, 1/2, 1, 1) = " + tadJS.tadPVIF2(0.10,10,0.5) );
document.write("<br/>");
document.write( "PVIF(10%, 10, 1/2, 1/2, 1) = " + tadJS.tadPVIF2(0.10,10,0.5,0.5) );
document.write("<br/>");
document.write( "PVIF(10%, 10, 1/2, 1/2, 1/2) = " + tadJS.tadPVIF2(0.10,10,0.5,0.5,0.5) );
document.write("<br/>");
document.write( "FVIF(10%, 10, 1, 1, 1) = " + tadJS.tadFVIF2(0.10,10) );
document.write("<br/>");
document.write( "FVIF(10%, 10, 1, 1/2, 1) = " + tadJS.tadFVIF2(0.10,10,undefined,0.5) );
document.write("<br/>");
document.write( "FVIF(10%, 10, 1/2, 1, 1) = " + tadJS.tadFVIF2(0.10,10,0.5) );
document.write("<br/>");
document.write( "FVIF(10%, 10, 1/2, 1/2, 1) = " + tadJS.tadFVIF2(0.10,10,0.5,0.5) );
document.write("<br/>");
document.write( "FVIF(10%, 10, 1/2, 1/2, 1/2) = " + tadJS.tadFVIF2(0.10,10,0.5,0.5,0.5) );
document.write("<br/>");
document.write( "NPV(10%, [-1000,500,400,300,100], 1, 1, 1, 1) = " + tadJS.tadNPV(0.10,cfs) );
document.write("<br/>");
document.write( "NPV(10%, [-1000,500,400,300,100], 0, 1, 1, 1) = " + tadJS.tadNPV(0.10,cfs,0) );
document.write("<br/>");
document.write( "NPV(10%, [-1000,500,400,300,100], 1, 1/2, 1, 1) = " + tadJS.tadNPV(0.10,cfs,undefined, 0.5) );
document.write("<br/>");
document.write( "NPV(10%, [-1000,500,400,300,100], 1, 1/2, 1/2, 1) = " + tadJS.tadNPV(0.10,cfs,undefined, 0.5, 0.5) );
document.write("<br/>");
document.write( "NPV(10%, [-1000,500,400,300,100], 1, 1/2, 1/2, 1/2) = " + tadJS.tadNPV(0.10,cfs,undefined, 0.5, 0.5,0.5) );
document.write("<br/>");
document.write( "NFV(10%, [-1000,500,400,300,100], 1, 1, 1, 1) = " + tadJS.tadNFV(0.10,cfs) );
document.write("<br/>");
document.write( "NFV(10%, [-1000,500,400,300,100], 0, 1, 1, 1) = " + tadJS.tadNFV(0.10,cfs,0) );
document.write("<br/>");
document.write( "NFV(10%, [-1000,500,400,300,100], 1, 1/2, 1, 1) = " + tadJS.tadNFV(0.10,cfs,undefined, 0.5) );
document.write("<br/>");
document.write( "NFV(10%, [-1000,500,400,300,100], 1, 1/2, 1/2, 1) = " + tadJS.tadNFV(0.10,cfs,undefined, 0.5, 0.5) );
document.write("<br/>");
document.write( "NFV(10%, [-1000,500,400,300,100], 1, 1/2, 1/2, 1/2) = " + tadJS.tadNFV(0.10,cfs,undefined, 0.5, 0.5,0.5) );
document.write("<br/>");
document.write( "IRR( [-1000,500,400,300,100], 1, 1, 1, 1) = " + tadJS.tadIRR(cfs) );
document.write("<br/>");
document.write( "IRR( [-1000,500,400,300,100], 0, 1, 1, 1) = " + tadJS.tadIRR(cfs,0) );
document.write("<br/>");
document.write( "IRR( [-1000,500,400,300,100], 1, 1/2, 1, 1) = " + tadJS.tadIRR(cfs,undefined,undefined, 0.5) );
document.write("<br/>");
document.write( "IRR( [-1000,500,400,300,100], 1, 1/2, 1/2, 1) = " + tadJS.tadIRR(cfs,undefined,undefined, 0.5, 0.5) );
document.write("<br/>");
document.write( "IRR( [-1000,500,400,300,100], 1, 1/2, 1/2, 1/2) = " + tadJS.tadIRR(cfs,undefined,undefined, 0.5, 0.5,0.5) );
document.write("<br/>");
document.write( "IRR2( [-1000,500,400,300,100], 1, 1, 1, 1) = " + tadJS.tadIRR2(cfs) );
document.write("<br/>");
document.write( "IRR2( [-1000,500,400,300,100], 0, 1, 1, 1) = " + tadJS.tadIRR2(cfs,0) );
document.write("<br/>");
document.write( "IRR2( [-1000,500,400,300,100], 1, 1/2, 1, 1) = " + tadJS.tadIRR2(cfs,undefined,undefined, 0.5) );
document.write("<br/>");
document.write( "IRR2( [-1000,500,400,300,100], 1, 1/2, 1/2, 1) = " + tadJS.tadIRR2(cfs,undefined,undefined, 0.5, 0.5) );
document.write("<br/>");
document.write( "IRR2( [-1000,500,400,300,100], 1, 1/2, 1/2, 1/2) = " + tadJS.tadIRR2(cfs,undefined,undefined, 0.5, 0.5,0.5) );
document.write("<br/>");
document.write( "XIRR = " + tadJS.tadXIRR(data_values,0.10) );
document.write("<br/>");
document.write( "XIRR = " + tadJS.tadXIRR(data_values,0.10,0.5) );
document.write("<br/>");
document.write( "XNPV = " + tadJS.tadXNPV(0.10,data_values) );
document.write("<br/>");
document.write( "XNPV = " + tadJS.tadXNPV(0.10,data_values,0.5) );
document.write("<br/>");

*/