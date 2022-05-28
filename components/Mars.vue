<template>
  <div ref="canvasHolder" className="canvasHolder">
    <div ref="canvas" className="canvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import {Clock} from 'three'
// import {ObjectControls} from 'threeJS-object-controls';

export default {
  components: {},
  props: {},
  data() {
    return {
      camera: null,
      cameraHolder: null,
      scene: null,
      world: null,
      renderer: null,
      container: null,
      controls: null,
      sunLight: null,
      ambientLight: null,
      txt_loader: null,
      gltf_loader: null,
      clock: null,
    }
  },
  computed: {},
  watch: {},
  mounted() {
    const self = this
    if (process.browser) {
      self.$nextTick(function () {
        self.init()
      })
    }
  },
  methods: {
    init() {
      const self = this

      // Setup
      self.container = self.$refs.canvas
      self.scene = new THREE.Scene()
      self.scene.background = new THREE.Color("#000")
      self.stagecenter = new THREE.Vector3(0, 0, 0)
      self.lastCameraPos = new THREE.Vector3(0, 0, 0)

      // Setup renderer
      self.clock = new Clock()
      self.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      self.renderer.setSize(
        self.container.clientWidth,
        // self.container.clientHeight
        1200
      )
      self.renderer.shadowMap.enabled = true
      self.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      self.renderer.toneMapping = THREE.ACESFilmicToneMapping
      self.renderer.toneMappingExposure = 1
      self.renderer.outputEncoding = THREE.sRGBEncoding
      self.renderer.setPixelRatio(window.devicePixelRatio / 1.5)
      self.container.appendChild(self.renderer.domElement)

      // Setup camera
      self.camera = new THREE.PerspectiveCamera(
        75,
        self.container.clientWidth / self.container.clientHeight,
        0.1,
        1000
      )

      self.camera.position.z = 2
      self.camera.position.x = 0
      self.camera.position.y = 0.1
      self.camera.far = 100000
      self.camera.updateProjectionMatrix()

      // Create world
      self.createWorld()
    },
    setupLight() {
      const self = this
      self.light = new THREE.DirectionalLight(0xcccccc, 1);
      self.light.position.set(-4, 2, 1);
      self.world.add(self.light)
    },
    async createWorld() {
      const self = this

      // Create world
      self.world = new THREE.Group()
      self.scene.add(self.world)
      self.world.position.set(0, 0, 0)
      await self.setupLight()

      // Add sphere
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshPhongMaterial();
      const mesh = new THREE.Mesh(geometry, material);

      // Add textures
      material.map = new THREE.TextureLoader().load('./textures/diffuse.jpeg');
      material.bumpMap = new THREE.TextureLoader().load('./textures/bump.jpeg');
      material.bumpScale = 0.010;

      mesh.position.set(0, 0, 0)
      mesh.rotation.set(0.5, 0, 0)
      mesh.castShadow = true
      self.world.add(mesh)

      // const controls = new ObjectControls(self.camera, self.renderer.domElement, self.mesh);
      // controls.disableZoom()
      // controls.enableVerticalRotation();
      // controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);
      // controls.setRotationSpeed(0.05);
      // self.world.add(controls)

      // dev grid
      /* const size = 1000
      const divisions = 1000
      const gridHelper = new THREE.GridHelper(size, divisions)
      self.world.add(gridHelper) */

      // Start render
      self.animate()
      await self.renderer.setAnimationLoop(self.render.bind(self))

      // Hide loading here
      self.$root.$emit('finished-loading')
    },
    render(timestamp, frame) {
      const self = this

      // Render scene
      self.renderer.render(self.scene, self.camera)

      // Render loop
      self.renderer.setAnimationLoop(self.render.bind(self))
    },
    animate() {
      const self = this
      self.world.rotation.y += 0.0015
      requestAnimationFrame(self.animate)
      self.render()
    },
  },
}
</script>

<style lang="scss" scoped>
.canvasHolder,
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: all;
  z-index: 1;
}
</style>
