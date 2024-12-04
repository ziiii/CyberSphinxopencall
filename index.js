//import * as THREE from 'three';
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/RGBELoader.js';


//set scene
const scene= new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const sizes=(window.innerWidth,window.innerHeight);
const near=0.1;
const far=3000;


//set camera
const camera= new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight,near,far);
camera.position.set(0, 0, 300);
scene.add(camera);

//set renderer
const renderer = new THREE.WebGLRenderer({alpha:true}); 
renderer.setClearColor(0x000000); // Set backgroxsund color to black
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;//enable shadow

document.body.appendChild(renderer.domElement);

//HDR FOR EnvMap
let envMap;
const envLoader=new RGBELoader();
envLoader.load("asset/photo_studio_01_1k.hdr",function(texture){
    texture.mapping = THREE.EquirectangularReflectionMapping;
//scene.background=texture;
envMap=texture;
applyMaterial();  
});

//HDR for background
const envLoader2=new RGBELoader();
envLoader2.load("asset/dersert2.hdr",function(texture){
    texture.mapping = THREE.EquirectangularReflectionMapping;
scene.background=texture;
//envMap=texture;
applyMaterial();  
});

let oc;
let blueelixir;
let floor;

//APPLY ENV TO fbx sample
// function applyMaterial(){

//     const ocloader = new FBXLoader();
//     ocloader.load('asset/ocsilver.fbx', (object) => {
//         oc=object;
//         object.traverse((child) => {
//             if (child.isMesh) {
//                 const originalMaterial = child.material;
//                 const newMaterial = new THREE.MeshPhysicalMaterial({
//                     color: originalMaterial.color, // Preserve the original color
//                     metalness: 1, // High metalness for a metallic look
//                     roughness: 0.01, // Low roughness for reflectivity
//                     envMap: envMap, // Apply the environment map
//                     envMapIntensity: 3.5, // Adjust intensity if needed
//                 });
//                 newMaterial.needsUpdate = true; // Ensure the material updates
//                 child.material = newMaterial; 
//             }
//         });
//         scene.add(object);
//     });

//     }



//LOAD STAGE ELEMENTS

const blackclawLoader = new GLTFLoader();
let blackclaw;
blackclawLoader.load('asset/blender_black_claw.glb', function (gltf) {
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            // Clone the existing material and update only envMap and related properties
            child.material = child.material.clone();
            child.material.envMap = envMap;  // Apply the environment map
            child.material.envMapIntensity = 1.5;  // Adjust intensity if needed
            child.material.needsUpdate = true; // Ensure the material updates with the new properties
        }
});
scene.add(gltf.scene);
 gltf.scene.scale.set(80, 80, 80);
gltf.scene.position.x-=90;
gltf.scene.position.y-=40;
 gltf.scene.position.z-=600;
gltf.scene.rotation.y = Math.PI / 4;
}, function (xhr) {
console.log((xhr.loaded / xhr.total * 100) + "%");
}, function (error) {
console.error('An error occurred:', error);
});



const greencatLoader = new GLTFLoader();
greencatLoader .load('asset/blender_green_cat.glb', function (gltf) {
    gltf.scene.traverse(function (child) {
   
            if (child.isMesh) {
                // Clone the existing material and update only envMap and related properties
                child.material = child.material.clone();
                child.material.envMap = envMap;  // Apply the environment map
                child.material.envMapIntensity = 1.5;  // Adjust intensity if needed
                child.material.needsUpdate = true; // Ensure the material updates with the new properties
            }

    });
    scene.add(gltf.scene);
    gltf.scene.scale.set(150, 150, 150);
    gltf.scene.position.x+=380;
    gltf.scene.position.z-=220;
    gltf.scene.position.y-=250;
   // gltf.scene.rotation.y = Math.PI / 80;
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "%");
}, function (error) {
    console.error('An error occurred:', error);
});


const silvercatLoader = new GLTFLoader();
silvercatLoader .load('asset/blender_silver_cat.glb', function (gltf) {
    gltf.scene.traverse(function (child) {
   
            if (child.isMesh) {
                // Clone the existing material and update only envMap and related properties
                child.material = child.material.clone();
                child.material.envMap = envMap;  // Apply the environment map
                child.material.envMapIntensity = 1.5;  // Adjust intensity if needed
                child.material.needsUpdate = true; // Ensure the material updates with the new properties
            }

    });
    scene.add(gltf.scene);
    gltf.scene.scale.set(100, 100, 100);
    gltf.scene.position.x-=200;
    gltf.scene.position.z+=790;
    gltf.scene.position.y-=220;
    gltf.scene.rotation.y = Math.PI / 2;
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "%");
}, function (error) {
    console.error('An error occurred:', error);
});



const wugongLoader = new GLTFLoader();
wugongLoader .load('asset/blender_silver_wugong.glb', function (gltf) {
    gltf.scene.traverse(function (child) {
   
            if (child.isMesh) {
                // Clone the existing material and update only envMap and related properties
                child.material = child.material.clone();
                child.material.envMap = envMap;  // Apply the environment map
                child.material.envMapIntensity = 1.5;  // Adjust intensity if needed
                child.material.needsUpdate = true; // Ensure the material updates with the new properties
            }

    });
    scene.add(gltf.scene);
    gltf.scene.scale.set(120, 120, 120);
     gltf.scene.position.z+=60;
     gltf.scene.position.x+=80;
     gltf.scene.position.y-=420;
     gltf.scene.rotation.y = -Math.PI / 7;
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "%");
}, function (error) {
    console.error('An error occurred:', error);
});

const blackframeLoader = new GLTFLoader();
blackframeLoader .load('asset/blender_black_frame.glb', function (gltf) {
    gltf.scene.traverse(function (child) {
   
            if (child.isMesh) {
                // Clone the existing material and update only envMap and related properties
                child.material = child.material.clone();
                child.material.envMap = envMap;  // Apply the environment map
                child.material.envMapIntensity = 1.5;  // Adjust intensity if needed
                child.material.needsUpdate = true; // Ensure the material updates with the new properties
            }

    });
    scene.add(gltf.scene);
    gltf.scene.scale.set(200, 200, 200);
    gltf.scene.position.x += 210;
    gltf.scene.position.y -= 720;
    gltf.scene.position.z += 80;
    // gltf.scene.rotation.y = Math.PI / 2;
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "%");
}, function (error) {
    console.error('An error occurred:', error);
});



const blacktotemLoader = new GLTFLoader();
blackframeLoader .load('asset/blender_black_totem.glb', function (gltf) {
    gltf.scene.traverse(function (child) {
   
            if (child.isMesh) {
                // Clone the existing material and update only envMap and related properties
                child.material = child.material.clone();
                child.material.envMap = envMap;  // Apply the environment map
                child.material.envMapIntensity = 1.5;  // Adjust intensity if needed
                child.material.needsUpdate = true; // Ensure the material updates with the new properties
            }
    });
    scene.add(gltf.scene);
    gltf.scene.scale.set(100, 100, 100);
     gltf.scene.position.x -= 740;
    gltf.scene.position.y-=270;
    // gltf.scene.position.z += 80;
    // gltf.scene.rotation.y = Math.PI / 2;
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "%");
}, function (error) {
    console.error('An error occurred:', error);
});



const silverclawLoader = new GLTFLoader();
silverclawLoader.load('asset/silvercalw.glb', function (gltf) {
    gltf.scene.traverse(function (child) {
   
            if (child.isMesh) {
                // Clone the existing material and update only envMap and related properties
                child.material = child.material.clone();
                child.material.envMap = envMap;  // Apply the environment map
                child.material.envMapIntensity = 1.5;  // Adjust intensity if needed
                child.material.needsUpdate = true; // Ensure the material updates with the new properties
            }
    });
    scene.add(gltf.scene);
    gltf.scene.scale.set(100, 100, 100);
    gltf.scene.position.set(-90, 10, 0);
    gltf.scene.position.y-=200;
    gltf.scene.rotation.y = Math.PI / 80;
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "%");
}, function (error) {
    console.error('An error occurred:', error);
});


const floorLoader = new GLTFLoader();
floorLoader.load('asset/blender_black_platform.glb', function (gltf) {
    gltf.scene.traverse(function (child) {
   
            if (child.isMesh) {
                // Clone the existing material and update only envMap and related properties
                child.material = child.material.clone();
                child.material.envMap = envMap;  // Apply the environment map
                child.material.envMapIntensity = 1.5;  // Adjust intensity if needed
                child.material.needsUpdate = true; // Ensure the material updates with the new properties
            }
    });
    scene.add(gltf.scene);
    gltf.scene.scale.set(100, 100, 100);
    gltf.scene.position.y-=200;
    // gltf.scene.position.set(-90, 10, 0);
    // gltf.scene.rotation.y = Math.PI / 80;
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "%");
}, function (error) {
    console.error('An error occurred:', error);
});
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(0, 100, 0); // Position the light above the scene
// directionalLight.target.position.set(0, -200, 0); // Make it point downwards at the origin
//scene.add(directionalLight);
//scene.add(directionalLight.target); // Don't forget to add the target to the scene

// Add a helper to visualize the light's direction
// const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(lightHelper);


//LOAD 3D TEXT: open call

const opencallLoader = new GLTFLoader();
opencallLoader .load('asset/silver_opencall.glb', function (gltf) {
    gltf.scene.traverse(function (child) {
   
            if (child.isMesh) {
                // Clone the existing material and update only envMap and related properties
                child.material = child.material.clone();
                child.material.envMap = envMap;  // Apply the environment map
                child.material.envMapIntensity = 1.5;  // Adjust intensity if needed
                child.material.needsUpdate = true; // Ensure the material updates with the new properties
            }
    });
    scene.add(gltf.scene);
    gltf.scene.scale.set(100, 100, 100);

    gltf.scene.position.y+=410;
//    gltf.scene.position.y-=100;
      gltf.scene.position.z += 80;
    // gltf.scene.rotation.y = Math.PI / 2;
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "%");
}, function (error) {
    console.error('An error occurred:', error);
});

// const openCallLoader = new FBXLoader();
// let openCall;
// const textLight = new THREE.PointLight(0xffffff, 3, 500); 
// const textLightHelper = new THREE.PointLightHelper(textLight, 10); 

// openCallLoader.load('asset/oc.fbx', function (fbxCharacter) {
//     openCall = fbxCharacter;
//     openCall.position.set(camera.position.x,camera.position.y,camera.position.z-300);
//     scene.add(openCall);
//     // const textLight = new THREE.PointLight(0xffffff, 3, 500);  // Color, intensity, and distance

// textLight.position.set(openCall.position.x+70, openCall.position.y+20, openCall.position.z+130);  // Set initial position above the character (adjust as needed)
// });  

const smallmarkLoader = new GLTFLoader();
smallmarkLoader.load('asset/blender_black_logo.glb', function (gltf) {
    gltf.scene.traverse(function (child) {
   
            if (child.isMesh) {
                // Clone the existing material and update only envMap and related properties
                child.material = child.material.clone();
                child.material.envMap = envMap;  // Apply the environment map
                child.material.envMapIntensity = 1.5;  // Adjust intensity if needed
                child.material.needsUpdate = true; // Ensure the material updates with the new properties
            }
    });
    scene.add(gltf.scene);
    gltf.scene.scale.set(100, 100, 100);
    gltf.scene.position.y-=290;
 gltf.scene.position.x-=160;
  
    // gltf.scene.position.set(-90, 10, 0);
    // gltf.scene.rotation.y = Math.PI / 80;
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "%");
}, function (error) {
    console.error('An error occurred:', error);
});




// load character and animation
    const fbxLoader = new FBXLoader();
    let character;
    let rootBone;
  
    const rootPosition = new THREE.Vector3();
    const rootStart = new THREE.Vector3();
    let shouldCapturePosition = false;

    let mixer;
    let animations={};
    let clipLoaded=0;
    let clipNumber=2;
let isWalkingOut=false;
let isWalkingBack=false;
let initialPosition = new THREE.Vector3();
let initialQuaternion = new THREE.Quaternion();
let isTransitioning = false; // New variable to manage transition state



//     fbxLoader.load('asset/rig_cyborg_t.fbx', function (fbxCharacter) {
//         character = fbxCharacter;
//         //character.castShadow = true; 
//         character.traverse((child) => {
//             if (child.isMesh) {
//                 child.castShadow = true;    // Allow the object to cast shadows
//                 child.receiveShadow = true; // Allow the object to receive shadows
//             }
//         });
      
// character.position.y-=200;
//         character.getWorldPosition(initialPosition);
//         character.getWorldQuaternion(initialQuaternion); //get the initial location

//         scene.add(character);
//         console.log(character);
      
//         rootBone = character.getObjectByName('mixamorigHips');
//         rootBone.updateMatrixWorld(true);  
//         rootBone.getWorldPosition(rootStart);
//         console.log("rootbone start point:",rootStart);   ///get the start position of the root bone
//             mixer = new THREE.AnimationMixer(character);


// // //LOAD WALKING
//             fbxLoader.load('asset/Catwalk Walk Forward_inplace.fbx', function (fbxAnimation) {
//                 const walkAnimation = fbxAnimation.animations[0];
//                 animations.walk = mixer.clipAction(walkAnimation);
//                 clipLoaded++;
//                 console.log(clipLoaded);
            
//         //load stopping AND TURNING
//             fbxLoader.load('asset/stopTurnWide8.fbx', function (fbxAnimation) {
//                 const stopTurnAnimation = fbxAnimation.animations[0];
//                 animations.stopTurn = mixer.clipAction(stopTurnAnimation);
//                 clipLoaded++;
//                 console.log(clipLoaded);

//                 if(clipLoaded==clipNumber){
//                  playSequence();
//                 }

//             });
//         }); 
//   });  

const modelLoader = new GLTFLoader();

modelLoader.load('asset/cyborg.glb', function (gltf) {
    character = gltf.scene;
    character.traverse((child) => {
        if (child.isMesh) {
            // child.castShadow = true;    // Allow the object to cast shadows
            // child.receiveShadow = true; // Allow the object to receive shadows
            child.material = child.material.clone();
            child.material.envMap = envMap;  // Apply the environment map
            child.material.envMapIntensity = 1.5;  // Adjust intensity if needed
            child.material.needsUpdate = true;
       
        }
    });
    
    character.scale.set(100,100,100);
    character.position.y -= 200;
    
    character.rotation.x = -Math.PI / 2; 
    character.updateMatrixWorld(true);

    character.getWorldPosition(initialPosition);
    character.getWorldQuaternion(initialQuaternion); // Get the initial location

    scene.add(character);
            console.log(character);
          
            rootBone = character.getObjectByName('mixamorigHips');
            rootBone.updateMatrixWorld(true);  
            rootBone.getWorldPosition(rootStart);
            console.log("rootbone start point:",rootStart);   ///get the start position of the root bone
                mixer = new THREE.AnimationMixer(character);
    
    // Load the animations
    loadAnimations();
});

// Function to load animations using FBXLoader
function loadAnimations() {
    // Load walking animation
    fbxLoader.load('asset/Catwalk Walk Forward_inplace.fbx', function (fbxAnimation) {
        const walkAnimation = fbxAnimation.animations[0];
        animations.walk = mixer.clipAction(walkAnimation);
        clipLoaded++;
        checkAllAnimationsLoaded();
    });

    // Load stopping and turning animation
    fbxLoader.load('asset/stopTurnWide8.fbx', function (fbxAnimation) {
        const stopTurnAnimation = fbxAnimation.animations[0];
        animations.stopTurn = mixer.clipAction(stopTurnAnimation);
        clipLoaded++;
        checkAllAnimationsLoaded();
    });
}

// Check if all animations have loaded
function checkAllAnimationsLoaded() {
    if (clipLoaded === clipNumber) {
        console.log("All animations loaded");
        playSequence();
        playTimeline();
    }
}

  function playSequence(){

        animations.walk.setLoop(THREE.LoopRepeat, 2);
        animations.walk.play();
        isWalkingOut=true;
        console.log("walking");
     

   animations.walk.getMixer().addEventListener('finished',function walkToStopTurn() {
 
         animations.walk.stop();
         animations.walk.reset();
         isWalkingOut=false;
         console.log("walking end");

         animations.stopTurn.setLoop(THREE.LoopRepeat, 1);
         animations.stopTurn.play();
         console.log("STOP playing");

    animations.walk.getMixer().removeEventListener('finished',walkToStopTurn);

    // });
 
    
    animations.stopTurn.getMixer().addEventListener('finished', function turnToWalkBack() {
        isTransitioning = true; // Set transition state
        character.visible = false; 

        const finalRootPosition = new THREE.Vector3();
        const finalRootQuaternion = new THREE.Quaternion();
        console.log(finalRootQuaternion);
        rootBone.getWorldPosition(finalRootPosition);
        rootBone.getWorldQuaternion(finalRootQuaternion);

        animations.stopTurn.stop();
        animations.stopTurn.reset();

        setTimeout(() => {
             //character.position.set(finalRootPosition.x, character.position.y, finalRootPosition.z);
            character.position.x = finalRootPosition.x;
            character.position.z = finalRootPosition.z;
            
            character.quaternion.copy(finalRootQuaternion);
            console.log(finalRootQuaternion);
            character.rotation.x =-Math.PI/2;
            rootBone.updateMatrixWorld(true);

            // Reset and prepare to play the walk animation
            animations.walk.reset();
            animations.walk.setLoop(THREE.LoopRepeat, 4);
            
            character.visible = true; 
            console.log("walking AGAIN");
            isTransitioning = false; // Reset transition state
        }, 20); // Delay time in milliseconds; adjust as needed

        isWalkingBack = true; 
        animations.walk.play();
    
        console.log("walking AGAIN");
        animations.stopTurn.getMixer().removeEventListener('finished',turnToWalkBack);
    
    // });

    animations.walk.getMixer().addEventListener('finished', function endRound() {


        isWalkingBack = false;
        animations.walk.stop();
         animations.walk.reset();
        character.position.copy(initialPosition);
        character.quaternion.copy(initialQuaternion);
   
        animations.walk.getMixer().removeEventListener('finished',endRound);
        playSequence();
        
    });

});
});
}


//mark the rootbone
const geometry = new THREE.BoxGeometry(40, 80, 40);  // Size of the cube
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  // Green color
const cube = new THREE.Mesh(geometry, material);

//scene.add(cube);
    
    
//ORBIT controls
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0,0, 1000 );
controls.update();


//set lighting
const light = new THREE.AmbientLight( 0x404040,3 ); // soft white light
scene.add( light );

const frameLight = new THREE.PointLight(0xffffff, 4, 300);  // Color, intensity, and distance
frameLight.position.set(-70, 460, 220);  // Set initial position above the character (adjust as needed)
scene.add(frameLight);  // Add the light to the scene
const frameLightHelper = new THREE.PointLightHelper(frameLight, 10);  // Adjust size of the helper
scene.add(frameLightHelper);

const followLight = new THREE.SpotLight(0xffffff);
const followLightHelper = new THREE.SpotLightHelper(followLight,1);
//light following character
if(character){
followLight.angle = Math.PI / 6; // Controls the cone's spread angle
followLight.distance = 500; // Maximum range of the spotlight
followLight.penumbra = 0.5;
followLight.position.set(0, 0, 1000); // Position the light above and in front of the model
followLight.target = character; // Make the light point at the model
followLight.target.updateMatrixWorld(); 
scene.add(followLight);
scene.add(followLightHelper);
followLightHelper.update();
}

//move forward while walking
let clock = new THREE.Clock();  // Create a clock to track delta time
let walkspeed = 3;  // Adjust this value to control how fast the character moves forward


const cameraPosZ=camera.position.z;
const cameraPosY=camera.position.y;
const cameraPosX=camera.position.x;
console.log("cameraPosZ");
console.log(cameraPosZ);

//CAMERA MOVEMENT
function playTimeline(){

    const tl = gsap.timeline({
        // onComplete: function() {
        //         scene.add(logoModel);
        //         logoModel.position.set(85,-110, 1000);
        //         fadeIn(logoModel);

        //         const topLight2 = new THREE.SpotLight(0xffffff, 0.5, 200, 0.5); // (color, intensity)
        //         topLight2.position.set(85,-130, 1100);
        //         topLight2.castShadow = true;
        //         scene.add(topLight2);
        //         //const spotLightHelper3 = new THREE.SpotLightHelper(topLight2);
        //         //scene.add( spotLightHelper3);
        //     }
    });
   tl.to({}, { duration: 1.3 })

    .to(camera.position, {      //move back
        z: cameraPosZ-400,
        y:cameraPosY-30,
        duration: 2.6, 
    })
    

    .to({}, { duration: 3 })     //SPOT hold

    .to(camera.position, {      //MOVE BACK further
        z: cameraPosZ-200,
        duration: 2.5
    })


  .to(camera.rotation, {
        x: 8*Math.PI,                
        duration: 1.5
    }, "<")
    .to(camera.position, {
        x: cameraPosX+150,               // turn left and back
z:cameraPosZ-100,
        duration: 2
    })

    //.to({}, { duration: 0.5 })           //HOLD


    .to(camera.rotation, {
        x: 0,                
        duration: 2
    }, "<")
    .to(camera.position, {
         x: cameraPosX,               // reverse turn left and back
         z:cameraPosZ-50,
        duration: 1.5
    })

    .to(camera.position, {
        x: cameraPosX,               //following the model
        z:cameraPosZ-400,
       duration: 4.5
   })


    .to({}, { duration: 2})      

    .to(camera.position, {
        // x: cameraPosX,               // far scene
        z:cameraPosZ+400,
        y: cameraPosY+150,
       duration:4.5
   })

 ;
  }





//ANIMATE
function animate(){
requestAnimationFrame(animate);
controls.update();
//followLightHelper.update();

//mark rootbone
const rootPosi = new THREE.Vector3();
rootBone.getWorldPosition(rootPosi);
cube.position.copy(rootPosi);

if (mixer) {
     let delta = clock.getDelta();  // Get the time passed since the last frame
     mixer.update(delta); 
    
     if (isWalkingOut) {
        // Move the character forward in the direction it is facing
        const forward = new THREE.Vector3(0, -1, 0); // Forward vector in local space
        forward.applyQuaternion(character.quaternion); // Transform the forward vector to world space
        character.position.addScaledVector(forward, walkspeed); // Move the character forward
    }
    if (isWalkingBack) {
       //  character.position.z-=walkspeed;
         const backward = new THREE.Vector3(0, -1, 0); // Backward vector in local space
         backward.applyQuaternion(character.quaternion); // Transform to world space
         character.position.addScaledVector(backward, walkspeed); // Move character backward
    }
    }

renderer.render(scene, camera);
}

animate();

