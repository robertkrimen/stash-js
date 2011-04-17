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
} );
