import * as THREE from "three";
const nodeGeometry = new THREE.CylinderGeometry(.5, .7, .3, 10);

const nodeMaterial1 = new THREE.MeshLambertMaterial( { color: 0xffffff } );
const nodeMaterial2 = new THREE.MeshLambertMaterial( { color: 0x00ffff } );
const nodeMaterial3 = new THREE.MeshLambertMaterial( { color: 0xff00ff } );
const nodeMaterial4 = new THREE.MeshLambertMaterial( { color: 0xffff00 } );
const nodeMaterial5 = new THREE.MeshLambertMaterial( { color: 0x000000 } );

function RenderNode(laneNumber) {

    let node;
    
    if (laneNumber === 1) {
        node = new THREE.Mesh( nodeGeometry, nodeMaterial1 );
        node.position.set(-5, .5, -40)
    } else if (laneNumber === 2) {
        node = new THREE.Mesh( nodeGeometry, nodeMaterial2 );
        node.position.set(-2.5, .5, -40)
    } else if (laneNumber === 3) {
        node = new THREE.Mesh( nodeGeometry, nodeMaterial3 );
        node.position.set(0, .5, -40)
    } else if (laneNumber === 4) {
        node = new THREE.Mesh( nodeGeometry, nodeMaterial4 );
        node.position.set(2.5, .5, -40)
    } else if (laneNumber === 5) {
        node = new THREE.Mesh( nodeGeometry, nodeMaterial5 );
        node.position.set(5, .5, -40)
    }

    node.castShadow = true;
    node.receiveShadow = false;
    return node;
}

export default RenderNode;