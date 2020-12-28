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

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        cube.castShadow = true;
        cube.receiveShadow = false;
        cube.position.set(0, 1.5, 0)
        scene.add( cube );

        const planeGeometry = new THREE.PlaneGeometry( 20, 200, 8, 8);
        const planeMaterial = new THREE.MeshLambertMaterial( {color: 0xffd1dc, side: THREE.DoubleSide,} );
        const plane = new THREE.Mesh( planeGeometry, planeMaterial );
        plane.rotateX(-Math.PI / 2);
        plane.receiveShadow = true;
        scene.add( plane );
        
        

        camera.position.z = 12;
        camera.position.y = 10;
        camera.lookAt(0, 0, 0)

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