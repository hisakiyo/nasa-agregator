<template>
  <div ref="canvasHolder" className="canvasHolder">
    <div ref="canvas" className="canvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import {Clock} from 'three'
import {ObjectControls} from 'threeJS-object-controls';

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
      // setup
      self.container = self.$refs.canvas
      self.scene = new THREE.Scene()
      self.scene.background = new THREE.Color("#000")
      self.stagecenter = new THREE.Vector3(0, 0, 0)
      self.lastCameraPos = new THREE.Vector3(0, 0, 0)

      // setup renderer
      self.clock = new Clock()
      self.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        physicallyCorrectLights: true,
        powerPreference: 'high-performance',
      })
      self.renderer.setSize(
        self.container.clientWidth,
        // self.container.clientHeight
        1200
      )
      self.renderer.shadowMap.enabled = true // important!
      self.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      self.renderer.toneMapping = THREE.ACESFilmicToneMapping
      self.renderer.toneMappingExposure = 1
      self.renderer.outputEncoding = THREE.sRGBEncoding
      self.renderer.setPixelRatio(window.devicePixelRatio)
      self.container.appendChild(self.renderer.domElement)
      // self.renderer.gammaFactor = 2.2

      // setup camera
      self.camera = new THREE.PerspectiveCamera(
        75,
        self.container.clientWidth / self.container.clientHeight,
        0.1,
        1000
      )

      self.camera.position.z = 2
      self.camera.position.x = 0
      self.camera.position.y = 0.1

      // create world
      self.createWorld()

      // add resize listener
      window.addEventListener('resize', self.resize, false)
    },
    setupLight() {
      const self = this
      self.light = new THREE.DirectionalLight(0xcccccc, 1);
      self.light.position.set(-4, 2, 1);
      self.world.add(self.light)
    },
    async createWorld() {
      const self = this
      // create world
      self.world = new THREE.Group()
      self.scene.add(self.world)
      self.world.position.set(0, 0, 0)
      await self.setupLight()

      // add sphere
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshPhongMaterial();
      const mesh = new THREE.Mesh(geometry, material);

      material.map = new THREE.TextureLoader().load('./textures/diffuse.jpeg');
      material.bumpMap = new THREE.TextureLoader().load('./textures/bump.jpeg');
      material.bumpScale = 0.010;

      mesh.position.set(0, 0, 0)
      mesh.rotation.set(0.5, 0, 0)
      mesh.castShadow = true
      self.world.add(mesh)

      const controls = new ObjectControls(self.camera, self.renderer.domElement, self.mesh);
      controls.disableZoom()
      // controls.enableVerticalRotation();
      // controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);
      // controls.setRotationSpeed(0.05);
      // self.world.add(controls)

      // dev grid
      /* const size = 1000
      const divisions = 1000
      const gridHelper = new THREE.GridHelper(size, divisions)
      self.world.add(gridHelper) */

      // start render
      self.animate()
      await self.renderer.setAnimationLoop(self.render.bind(self))
      self.resize()

      // hide loading here
      self.$root.$emit('finished-loading')
    },
    render(timestamp, frame) {
      const self = this
      // update camera
      self.camera.aspect =
        self.container.clientWidth / self.container.clientHeight
      self.camera.updateProjectionMatrix()

      // render scene
      self.renderer.render(self.scene, self.camera)

      // render loop
      self.renderer.setAnimationLoop(self.render.bind(self))
    },
    animate() {
      const self = this
      self.world.rotation.y += 0.0015
      // console.log(self.world.rotation.y)
      requestAnimationFrame(self.animate)
      self.render()
    },
    resize() {
      const self = this
      // update camera
      self.camera.aspect =
        self.container.clientWidth / self.container.clientHeight
      self.camera.updateProjectionMatrix()
      self.renderer.setSize(
        self.container.clientWidth,
        self.container.clientHeight
      )
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
