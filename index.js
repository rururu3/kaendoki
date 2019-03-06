const THREE = require('./js/three.js');
require('./js/STLLoader.js');
require('./js/TrackballControls.js');

let App = {
  update: function() {
    App.controls.update();
    App.renderer.render( App.scene, App.camera );
    requestAnimationFrame( App.update );
  }
};

// ロード時にThreeJS処理をする
window.addEventListener('load', function() {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  App.renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  App.renderer.setPixelRatio(window.devicePixelRatio);
  App.renderer.setSize(width, height);

  // シーンを作成
  App.scene = new THREE.Scene();

  // カメラを作成
  App.camera = new THREE.PerspectiveCamera(45, width / height);
  App.camera.position.set(0, 0, +1000);

  //ライトを用意
  App.directionalLightUp = new THREE.DirectionalLight( 0xffffff, 3 );
  App.directionalLightUp.position.z = 10;
  App.scene.add( App.directionalLightUp );

  App.directionalLightDown = new THREE.DirectionalLight( 0xffffff, 3 );
  App.directionalLightDown.position.z = -10;
  App.scene.add( App.directionalLightDown );

  // 環境光
  App.aLight = new THREE.AmbientLight( 0xffffff);
  App.scene.add( App.aLight );

  //3Dを用意
  let loader = new THREE.STLLoader();
  loader.load('./assets/kaendoki_20180725.stl', function(geometry) {
    let material = new THREE.MeshLambertMaterial( { color: 0xff5533} );
    let mesh = new THREE.Mesh(geometry, material);
    App.scene.add(mesh);

    // Controlsを用意
    App.controls = new THREE.TrackballControls( App.camera );
    App.update();
  });
});
