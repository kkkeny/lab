//1
var adapter = new wrAdapter();


JS.Test.describe('Types', function() { with(this) {
  it('type of arguments', function() { with(this) {
    assertEqual('function',adapter.fn1(function(){}));
    assertEqual('string',adapter.fn1("abc"));
    assertEqual('object',adapter.fn1({}));
    assertEqual('array',adapter.fn1([]));
    assertEqual('number',adapter.fn1(1));
    assertEqual('date',adapter.fn1(new Date()));
    assertEqual(false,adapter.fn1(undefined));
    assertEqual(false,adapter.fn1(0));
    assertEqual(false,adapter.fn1(null));
  }})

}});

//2
JS.Test.describe('data format', function() { with(this) {  
  it('is should be chinese', function() { with(this) {
    assertEqual("2013年11月22日 13:58:28",adapter.fn2(new Date(1385099908055)));    
  }})
}})

//3
JS.Test.describe('print 1-99999 run time', function() { with(this) {  
  it('display total run time', function() { with(this) {
    assert(adapter.fn3());
  }})
}})

//4
JS.Test.describe('Binary Decimal Hex', function() { with(this) {  
  it('is should be show all ', function() { with(this) {
    assert(adapter.fn4(256));
    assert(adapter.fn4(087));
    assert(adapter.fn4(0xcd));
  }})
}})

//5
JS.Test.describe('countdown print', function() { with(this) {  
  it('every second diplay last time ', function() { with(this) {
    assert(adapter.fn5(2));
    assert(adapter.fn5(5));
  }})
}})

//6
JS.Test.describe('array sequence random', function() { with(this) {  
  it('array random is return string ', function() { with(this) {
    assert(adapter.fn6("Tadu f2e is very good!".split(" ")));
    assertEqual("string",adapter.fn1(adapter.fn6("Tadu f2e is very good!".split(" "))));
  }})
}})

//7
JS.Test.describe('valid phoen code', function() { with(this) {  
  it('is should be return true or false', function() { with(this) {
    assertEqual(true,adapter.fn7('18611156772'));
    assertEqual(true,adapter.fn7(' 18611156772'));
    assertEqual(true,adapter.fn7('18611156772 '));
    assertEqual(true,adapter.fn7(' 18611156772 '));
    assertEqual(true,adapter.fn7('15611156772'));

    assertEqual(false,adapter.fn7(' 1861115677'));
    assertEqual(false,adapter.fn7('1861115677 '));
    assertEqual(false,adapter.fn7('1361115677'));
    assertEqual(false,adapter.fn7('18a6115677'));
    assertEqual(false,adapter.fn7('18611a5672'));
    assertEqual(false,adapter.fn7('a186115672'));    
    assertEqual(false,adapter.fn7('18611a567a'));
  }})
}})

//8
JS.Test.describe('add <p> at every paragraph', function() { with(this) {  
  it('every paragraph use p warp ', function() { with(this) {
    assert(adapter.fn8("this is a paragraph\nthis is a paragraph\nthis is a paragraph\nthis is a paragraph\nthis is a paragraph\nthis is a paragraph\n"));  
  }})
}})