function a_1_2()
{
    var a = arguments[0], type = typeof a;
    console.log(type);
    switch(type)
    {
        case "object":
            if (a === null)
                return false;
            break;
        case "undefined":
            return false;
            break;
        case "number":
            if (a === 0)
                return false;
            break;
    }
    if (Object.prototype.toString.call(a) == "[object Date]")
    {
        return a.toLocaleString().replace(/(上午|下午)/, "");
    }
}
function a_3()
{
    var n = 0, res = 0, start = new Date().getTime();
    while (n < 100000)
    {
        res += n++;
    }
    console.log(res + " cost time:" + parseFloat(((new Date().getTime() - start)) / 1000) + "s");
}
function a_4(n)
{
    if (isNaN(n))
        return;
    var reg8 = /^0(?!x)\d+/, reg16 = /^0x/;
    var temp;
    if (reg8.test(n))
        temp = parseInt(n, 8);
    else if (reg16.test(n))
        temp = parseInt(n, 16);
    else
        temp = parseInt(n, 10);
    console.log(temp + ":" + temp.toString(2) + "<>" + temp.toString(8) + "<>" + temp.toString(10) + "<>" + temp.toString(16));
}
function a_5(t)
{
    if (isNaN(t))
        return;
    var t = parseInt(t), s = ["0", "!", "!!", "!!!"];
    var watch = window.setInterval(function()
    {
        t--;
        if (t <= 3)
            console.log(s[t]);
        if (t === 0)
            window.clearInterval(watch);
    }, 1000);
}
function a_6(a)
{
    if (Object.prototype.toString.call(a) != "[object Array]")
        return;
    var res = [], len = a.length;
    while (len > 0)
    {
        index = Math.random() * len;
        res.push(a.splice(index, 1)[0]);
        len--;
    }
    console.log(res.join("-"));
}
function a_7(n)
{
    var reg = /^\s*\d{11}\s*$/;
    if (reg.test(n))
    {
        reg = /^\s*(18|15)\d+/;
        if (reg.test(n))
            return true;
    }
    return false;
}
function a_8()
{
    var s = "this is a paragraph\nthis is a paragraph\nthis is a paragraph\nthis is a paragraph\nthis is a paragraph\nthis is a paragraph\n";
    var reg = /^\n?([^\n]+)\n/g, ss;
    //while (reg.test(s))
    //{
        ss = s.replace(reg, "<p>$1</p>");
    //}
    console.log(ss);
}
function a_9()
{
    var n = 1, o =
    {
        get : function()
        {
            return n;
        },
        set : function(m)
        {
            n = m;
        }
    };
    return o;
}
function Father()
{
    this.walk = function(word)
    {
        console.log(word);
    };
}
function Son()
{
    this.word = "haha";
    this.run = function()
    {
        new Father().walk.call(this, this.word);
    };
}
