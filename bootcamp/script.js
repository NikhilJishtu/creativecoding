let scene, camera, renderer, cubes = [];
let trailLength = 20; // number of previous positions to keep in the trail

init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#191919');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("container").appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({ color:'pink' });

    for (let i = 0; i < 500; i++) {
        let cube = new THREE.Mesh(geometry, material);
        cube.position.x = (Math.random() * 100) - 50;
        cube.position.y = (Math.random() * 100) - 50;
        cube.position.z = (Math.random() * 100) - 50;
        scene.add(cube);
        cubes.push(cube);
    }

    let light = new THREE.PointLight('purple', 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);
}

function animate() {
    requestAnimationFrame(animate);

    for (let i = 0; i < cubes.length; i++) {
        let cube = cubes[i];
        cube.position.x += 0.1;
        cube.position.y += 0.05;
        cube.position.z += 0.05;
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.1;

        let trailGeometry = new THREE.BoxGeometry(1, 1, 1);
        let trailMaterial = new THREE.MeshLambertMaterial({ color: 'pink', transparent: true, opacity: 0. });
        let trail = new THREE.Mesh(trailGeometry, trailMaterial);
        trail.position.copy(cube.position);
        scene.add(trail);
        cube.userData.trail = cube.userData.trail || [];
        cube.userData.trail.push(trail);

        if (cube.userData.trail.length > trailLength) {
            let firstTrail = cube.userData.trail.shift();
            scene.remove(firstTrail);
        }
    }

    renderer.render(scene, camera);
}