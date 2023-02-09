    let scene, camera, renderer, cubes = [];

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
        let material = new THREE.MeshLambertMaterial({ color:'red' });

        for (let i = 0; i < 5000; i++) {
            let cube = new THREE.Mesh(geometry, material);
            cube.position.x = (Math.random() * 100) -50;
            cube.position.y = (Math.random() * 100) -50;
            cube.position.z = (Math.random() * 100) -50;
            scene.add(cube);
            cubes.push(cube);
        }

        let light = new THREE.PointLight('crimson', 200, 100);
        light.position.set(5, 5, 5);
        scene.add(light);
    }

    function animate() {
        requestAnimationFrame(animate);
        for (let i = 0; i < cubes.length; i++) {
            cubes[i].position.x += 0;
            cubes[i].position.y += 0;
            cubes[i].position.z += 1;
            
            cubes[i].rotation.x += 0.05;


            if(cubes[i].position.x > 50){
                cubes[i].position.x = -50;
            }
            if(cubes[i].position.y > 50){
                cubes[i].position.y = -50;
            }
            if(cubes[i].position.z > 50){
                cubes[i].position.z = -50;
            }

        }
        renderer.render(scene, camera);
    }