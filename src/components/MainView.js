import React, { useEffect, useRef } from 'react'
import * as THREE from "three";
import RenderNode from './RenderNode'

import bk from './img/corona_bk.png';
import dn from './img/corona_dn.png';
import ft from './img/corona_ft.png';
import lf from './img/corona_lf.png';
import rt from './img/corona_rt.png';
import up from './img/corona_up.png';
import platformTexture from './texture/plane_texture_3.jpg';

function MainView(){
    const ref = useRef();
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0xFFFFFF, 0.5);
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );


        //Create a DirectionalLight and turn on shadows for the light
        const light1 = new THREE.DirectionalLight( 0xffffff, 1.2, 100 );
        light1.position.set( -5, 20, 10 );
        light1.castShadow = true;
        scene.add( light1 );

        //Set up shadow properties for the light
        light1.shadow.mapSize.width = 512;
        light1.shadow.mapSize.height = 512;
        light1.shadow.camera.near = 0.5;
        light1.shadow.camera.far = 500;


        //Will need to find a way to use local images for the skybox
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            ft,
            bk,
            up,
            dn,
            rt,
            lf,
        ]);
        scene.background = texture;


        //The plane where the game will be played
        const planeGeometry = new THREE.PlaneGeometry( 16, 600, 8, 8);
        const planeLoader = new THREE.TextureLoader();
        const planeTexture = planeLoader.load(platformTexture);
        const planeMaterial = new THREE.MeshLambertMaterial( {map: planeTexture} );
        planeTexture.wrapS = THREE.RepeatWrapping;
        planeTexture.wrapT = THREE.RepeatWrapping;
        planeTexture.repeat.set( 1,  30);
        

        const plane = new THREE.Mesh( planeGeometry, planeMaterial );
        plane.rotateX(-Math.PI / 2);
        plane.receiveShadow = true;
        planeMaterial.side = THREE.DoubleSide;
        scene.add( plane );

        //edges of the platform to make it look neater
        const edgeGeometry1 = new THREE.BoxGeometry(1, 1, 500);
        const edgeGeometry2 = new THREE.BoxGeometry(1, 1, 500);
        const edgeTexture = planeLoader.load(platformTexture);
        const edgeMaterial = new THREE.MeshLambertMaterial( {map: edgeTexture} );
        edgeTexture.wrapS = THREE.RepeatWrapping;
        edgeTexture.wrapT = THREE.RepeatWrapping;
        edgeTexture.repeat.set(.1, 30);

        const edge1 = new THREE.Mesh ( edgeGeometry1, edgeMaterial );
        const edge2 = new THREE.Mesh ( edgeGeometry2, edgeMaterial );

        edge1.position.set(8, 0, 0);
        edge2.position.set(-8, 0, 0);
        scene.add(edge1);
        scene.add(edge2);
        

        //Lines for the nodes to drop down
        const nodeLineGeometry = new THREE.BoxGeometry(0.2, 0.2, 500);
        const nodeLineMaterial = new THREE.MeshLambertMaterial({ color: 0x999999 });
        const nodeLine1 = new THREE.Mesh(nodeLineGeometry, nodeLineMaterial);
        const nodeLine2 = new THREE.Mesh(nodeLineGeometry, nodeLineMaterial);
        const nodeLine3 = new THREE.Mesh(nodeLineGeometry, nodeLineMaterial);
        const nodeLine4 = new THREE.Mesh(nodeLineGeometry, nodeLineMaterial);
        const nodeLine5 = new THREE.Mesh(nodeLineGeometry, nodeLineMaterial);
        
        nodeLine1.position.set(-5, .1, -200);
        nodeLine2.position.set(-2.5, .1, -200);
        nodeLine3.position.set(0, .1, -200);
        nodeLine4.position.set(2.5, .1, -200);
        nodeLine5.position.set(5, .1, -200);

        let nodeLineList = [nodeLine1, nodeLine2, nodeLine3, nodeLine4, nodeLine5]

        for (let i = 0; i < 5; i++) {
            nodeLineList[i].receiveShadow = true;
            nodeLineList[i].castShadow = true;
            scene.add(nodeLineList[i])
        }

        //Temporarily used to visualize RenderNode function. (Will have to incorporate another function)
        let myNode = RenderNode(4);
        scene.add(myNode);

        const platformGeometry = new THREE.CylinderGeometry(.8, .8, 0.5, 10);
        const centerGeometry = new THREE.CylinderGeometry(.6, .6, 0.5, 10);
        const platformMaterial1 = new THREE.MeshLambertMaterial({ color: 0xaa0028 });
        const platformMaterial2 = new THREE.MeshLambertMaterial({ color: 0xf67f46 });
        const platformMaterial3 = new THREE.MeshLambertMaterial({ color: 0xccc588 });
        const platformMaterial4 = new THREE.MeshLambertMaterial({ color: 0x00544c });
        const platformMaterial5 = new THREE.MeshLambertMaterial({ color: 0x003238 });
        const centerMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

        const platform1 = new THREE.Mesh(platformGeometry, platformMaterial1);
        const platform2 = new THREE.Mesh(platformGeometry, platformMaterial2);
        const platform3 = new THREE.Mesh(platformGeometry, platformMaterial3);
        const platform4 = new THREE.Mesh(platformGeometry, platformMaterial4);
        const platform5 = new THREE.Mesh(platformGeometry, platformMaterial5);

        const center1 = new THREE.Mesh(centerGeometry, centerMaterial);
        const center2 = new THREE.Mesh(centerGeometry, centerMaterial);
        const center3 = new THREE.Mesh(centerGeometry, centerMaterial);
        const center4 = new THREE.Mesh(centerGeometry, centerMaterial);
        const center5 = new THREE.Mesh(centerGeometry, centerMaterial);

        platform1.position.set(-5, .1, 7.3);
        platform2.position.set(-2.5, .1, 7.3);
        platform3.position.set(0, .1, 7.3);
        platform4.position.set(2.5, .1, 7.3);
        platform5.position.set(5, .1, 7.3);

        center1.position.set(-5, .2, 7.3);
        center2.position.set(-2.5, .2, 7.3);
        center3.position.set(0, .2, 7.3);
        center4.position.set(2.5, .2, 7.3);
        center5.position.set(5, .2, 7.3);

        let platformList = [platform1, platform2, platform3, platform4, platform5];
        let centerList = [center1, center2, center3, center4, center5];

        for (let i = 0; i < 5; i++) {
            platformList[i].receiveShadow = true;
            platformList[i].castShadow = true;
            scene.add(platformList[i])

            centerList[i].receiveShadow = true;
            centerList[i].castShadow = true;
            scene.add(centerList[i])
        }

        
        
        //Camera positioning
        camera.position.z = 14;
        camera.position.y = 10;
        camera.position.x = 0;
        camera.lookAt(0, 3, 0);

        const color = 0x090309;
        const near = 10;
        const far = 50;
        scene.fog = new THREE.Fog(color, near, far);

        const animate = () => {
            requestAnimationFrame( animate );

            //Temporarily placed to visualize RenderNode function.
            myNode.translateZ(0.15);

            renderer.render( scene, camera );
        };

        const onWindowResize= () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        
        window.addEventListener('resize', onWindowResize, false);
        
        animate();
    }, [])
 
    
    return(<canvas ref={ref}></canvas>)
}

export default MainView