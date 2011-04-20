$( function(){
    var $log = yzzy.log;

    test( 'basic', function(){
        $log( 'Hello, World.' );
        ok( true );
    } );

    test( 'KeyValueStash', function(){
        var stash, lastEvent;

        stash = new yzzy.stash.KeyValueStash();
        deepEqual( stash.all(), [] );

        stash.set( 1, 'Xyzzy 1' );
        deepEqual( stash.all(), [ 'Xyzzy 1' ] );

        stash.set( 2, 'Xyzzy 2' );
        deepEqual( stash.all(), [ 'Xyzzy 1', 'Xyzzy 2' ] );

        stash.set( 0, 'Xyzzy 0' );
        deepEqual( stash.all(), [ 'Xyzzy 0', 'Xyzzy 1', 'Xyzzy 2' ] );

        stash.bind( 'set', function(){
            lastEvent = arguments[ 0 ];
        } );

        stash.set( 1.5, 'Xyzzy 1.5' );
        deepEqual( stash.all(), [ 'Xyzzy 0', 'Xyzzy 1', 'Xyzzy 1.5', 'Xyzzy 2' ] );
        ok( lastEvent );
        equal( lastEvent.previous, stash.get( 1 ) );
        equal( lastEvent.next, stash.get( 2 ) );
        lastEvent = null;

        stash.set( 3, 'Xyzzy 3' );
        ok( lastEvent );
        equal( lastEvent.previous, stash.get( 2 ) );
        equal( lastEvent.next, null );
    } );

    test( 'KeyValueStash.{set/add}ByKey', function(){
        var stash, lastEvent;

        stash = new yzzy.stash.KeyValueStash();
        deepEqual( stash.all(), [] );

        var alice, bob, charlie;
        stash.bind( 'set', {
            'alice': function(){
                alice = true;
            },
            'bob': function(){
                charlie = false;
                bob = true;
            }
        } );
        stash.bind( 'set', function(){
            alice = false;
            bob = false;
            charlie = true;
        } );

        stash.set( 'alice', 0 );
        ok( alice );
        ok( !bob );
        ok( !charlie );
        stash.set( 'charlie', 0 );
        ok( !alice );
        ok( !bob );
        ok( charlie );
        stash.set( 'bob', 0 );
        ok( !alice );
        ok( bob );
        ok( !charlie );
    } );

    test( 'slice', function(){
        var stash;

        stash = { alice: 1, bob: 2, charlie: 3 };
        deepEqual( yzzy.stash.slice( stash, [ 'alice', 'bob' ] ).copy(), {
            alice: 1,
            bob: 2
        } );
        deepEqual( yzzy.stash.slice( stash, [] ).copy(), {} );
        deepEqual( yzzy.stash.slice( stash, [ 'charlie' ] ).copy(), {
            charlie: 3
        } );
    } );
} );
