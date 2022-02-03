			var container;

			var camera, scene, renderer;


			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			var objecta;


			init();
			animate();


			function init() {

				//container = document.createElement( 'div' );
				container = document.getElementById("pumpkin");
				//document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 30, 1, 1, 2000 );
				camera.position.z = 80;
				camera.position.y = 100;

				// scene

				scene = new THREE.Scene();

				var ambient = new THREE.AmbientLight( 0x101030 );
				scene.add( ambient );

				var directionalLight = new THREE.DirectionalLight( 0xffeedd );
				directionalLight.position.set( 25, 40, 5 );
				scene.add( directionalLight );
				//var guide = new THREE.DirectionalLightHelper(directionalLight);
				//scene.add(guide);

				// texture

				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {

					console.log( item, loaded, total );

				};

				var texture = new THREE.Texture();

				var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};

				var onError = function ( xhr ) {
				};


				var loader = new THREE.ImageLoader( manager );
				loader.load( '/script/melon/melon2.jpg', function ( image ) {

					texture.image = image;
					texture.needsUpdate = true;

				} );
				var texx = THREE.ImageUtils.loadTexture("/script/melon/melon2.jpg");
				var tex2 = THREE.ImageUtils.loadTexture("/script/melon/melon2n.jpg");

				// model

				var loader = new THREE.OBJLoader( manager );
				loader.load( '/script/melon/melon2.obj', function ( object ) {

					object.traverse( function ( child ) {

						if ( child instanceof THREE.Mesh ) {
							child.material = new THREE.MeshPhongMaterial();

							child.material.map = texx;
							child.material.normalMap = tex2;
							child.material.shininess = 10;
							child.material.normalScale = new THREE.Vector2(0.4,0.4);

						}

					} );

					object.position.y = - 0;
					object.scale.set(80,80,80);
					scene.add( object );
					objecta = object;

				}, onProgress, onError );

				//

				renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize(600,600);
				container.appendChild( renderer.domElement );


				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				boxX = container.parentElement.getClientRects()[0].width;
				boxY = container.parentElement.getClientRects()[0].width;
				camera.aspect = boxX / boxY;
				camera.updateProjectionMatrix();

				//renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setSize( boxX, boxX);

			}


			//

			function animate() {

				requestAnimationFrame( animate );
				if (objecta) objecta.rotateOnAxis(new THREE.Vector3(0,1,0),-.005);
				render();

			}

			function render() {

				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}


