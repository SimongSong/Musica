import React, { useEffect, useRef } from 'react'
import ReactDOM from "react-dom";
import * as THREE from "three";
function MainView(){
    const ref = useRef();
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );


        //Create a DirectionalLight and turn on shadows for the light
        const light = new THREE.DirectionalLight( 0xffffff, 1.2, 100 );
        light.position.set( -2, 5, 3 );
        light.castShadow = true;
        scene.add( light );

        //Set up shadow properties for the light
        light.shadow.mapSize.width = 512;
        light.shadow.mapSize.height = 512;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500;


        //Will need to find a way to use local images for the skybox
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            'corona_bk.jpg',
            'corona_dn.jpg',
            'corona_ft.jpg',
            'corona_lf.jpg',
            'corona_rt.jpg',
            'corona_up.jpg',
        ]);
        scene.background = texture;

        //Dummy Box to test out shadows, lighting, and positioning
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshLambertMaterial( { color: 0x00ffff } );
        const cube = new THREE.Mesh( geometry, material );
        cube.castShadow = true;
        cube.receiveShadow = false;
        cube.position.set(0, 1.5, 0)
        scene.add( cube );

        //The plane where the game will be played
        const planeGeometry = new THREE.PlaneGeometry( 16, 2000, 8, 8);
        const planeMaterial = new THREE.MeshLambertMaterial( {color: 0xb19cd9, side: THREE.DoubleSide,} );
        const plane = new THREE.Mesh( planeGeometry, planeMaterial );
        plane.rotateX(-Math.PI / 2);
        plane.receiveShadow = true;
        scene.add( plane );
        
        const lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000} );
        const lineGeometry = new THREE.Geometry();

        //Lines used to drop down the nodes
        lineGeometry.vertices.push( new THREE.Vector3(-5, 0.1, -300));
        lineGeometry.vertices.push( new THREE.Vector3(-5, 1.1, 9));
        lineGeometry.vertices.push( new THREE.Vector3(-2.5, 0.1, -300));
        lineGeometry.vertices.push( new THREE.Vector3(-2.5, 1.1, 9));
        lineGeometry.vertices.push( new THREE.Vector3(0, 0.1, -300));
        lineGeometry.vertices.push( new THREE.Vector3(0, 1.1, 9));
        lineGeometry.vertices.push( new THREE.Vector3(2.5, 0.1, -300));
        lineGeometry.vertices.push( new THREE.Vector3(2.5, 1.1, 9));
        lineGeometry.vertices.push( new THREE.Vector3(5, 0.1, -300));
        lineGeometry.vertices.push( new THREE.Vector3(5, 1.1, 9));

        var line = new THREE.LineSegments( lineGeometry, lineMaterial );
        scene.add( line );

        
        //Camera positioning
        camera.position.z = 14;
        camera.position.y = 10;
        camera.lookAt(0, 3, 0);

        const color = 0x000000;
        const near = 10;
        const far = 60;
        scene.fog = new THREE.Fog(color, near, far);

        const animate = () => {
            requestAnimationFrame( animate );

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render( scene, camera );
        };

        animate();
    }, [])
 
    
    return(<canvas ref={ref}></canvas>)
}

export default MainView