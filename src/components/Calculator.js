import * as THREE from 'three'
import styles from './Calculator.module.css'
import { useThree, useFrame } from "@react-three/fiber"
import { Html } from '@react-three/drei'

const Calculator = () => 
{
    const scene = useThree().scene

    function getCSV()
    {
        var numbers = {}
        numbers.number1 = 35
        numbers.frame = 1000

        var positions = []
        var materials = []
        var geometries = []
        var gp_geometries = []
        var particles = []
        var gp_particles = []

        var all = []
        var gp = []
        var req = new XMLHttpRequest() // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成

        req.open("get", "/static/All.csv", true) // アクセスするファイルを指定
        req.send(null) // HTTPリクエストの発行
        req.onload = function()
        {
            //convertCSVtoArray(req.responseText) // 渡されるのは読み込んだCSVデータ
            //var result = [] // 最終的な二次元配列を入れるための配列
            var tmp = req.responseText.split("\n") // 改行を区切り文字として行を要素とした配列を生成
            
            for(let z = 0 ; z < numbers.number1 ; z++)
            {
                let result = []

                for(let i = 0 ; i < 1000 ; i++)
                {
                    result[i] = tmp[(1000 * z) + i].split(',')
                }    

                all[z] = result
            }

            for(let z = 0 ; z < numbers.number1 ; z++)
            {
                for(let i = 0 ; i < 1000 ; i++)
                {
                    let all_copy1 = all[z][i][1]
                    let all_copy2 = all[z][i][2]

                    all[z][i][2] = all_copy1
                    all[z][i][1] = all_copy2
                }
            }

            gp[0] = new Float32Array(1000)
            gp[1] = new Float32Array(1000)
            gp[2] = new Float32Array(1000)

            for(let i = 0 ; i < 1000 ; i++)
            {
                gp[0][i] = (
                            ((parseFloat(all[0][i][0]) + parseFloat(all[1][i][0]) + parseFloat(all[2][i][0]) + parseFloat(all[3][i][0]))) / 4.0 * 4.35 +
                            (parseFloat(all[7][i][0]) + parseFloat(all[14][i][0]) + parseFloat(all[4][i][0]) + parseFloat(all[12][i][0]) + parseFloat(all[13][i][0])) / 5 * 30.81 +
                            (parseFloat(all[5][i][0]) + parseFloat(all[8][i][0])) / 2 * 1.7 +
                            (parseFloat(all[6][i][0]) + parseFloat(all[9][i][0])) / 2 * 1.7 +
                            (parseFloat(all[8][i][0]) + parseFloat(all[10][i][0]) + parseFloat(all[19][i][0])) / 3 * 1.01 +
                            (parseFloat(all[9][i][0]) + parseFloat(all[11][i][0]) + parseFloat(all[20][i][0])) / 3 * 1.01 +
                            (parseFloat(all[33][i][0])) / 1 * 0.38 +
                            (parseFloat(all[34][i][0])) / 1 * 0.38 +
                            (parseFloat(all[15][i][0]) + parseFloat(all[17][i][0]) + parseFloat(all[21][i][0]) + parseFloat(all[23][i][0])) / 4 * 6.93 +
                            (parseFloat(all[16][i][0]) + parseFloat(all[18][i][0]) + parseFloat(all[22][i][0]) + parseFloat(all[24][i][0])) / 4 * 6.93 +
                            (parseFloat(all[23][i][0]) + parseFloat(all[25][i][0]) + parseFloat(all[27][i][0])) / 3 * 3.21 +
                            (parseFloat(all[24][i][0]) + parseFloat(all[26][i][0]) + parseFloat(all[28][i][0])) / 3 * 3.21 +
                            (parseFloat(all[27][i][0]) + parseFloat(all[29][i][0]) + parseFloat(all[30][i][0])) / 3 * 0.693 +
                            (parseFloat(all[28][i][0]) + parseFloat(all[31][i][0]) + parseFloat(all[32][i][0])) / 3 * 0.693
                            ) / 63.006

                gp[1][i] = (
                            ((parseFloat(all[0][i][1]) + parseFloat(all[1][i][1]) + parseFloat(all[2][i][1]) + parseFloat(all[3][i][1]))) / 4.0 * 4.35 +
                            (parseFloat(all[7][i][1]) + parseFloat(all[14][i][1]) + parseFloat(all[4][i][1]) + parseFloat(all[12][i][1]) + parseFloat(all[13][i][1])) / 5 * 30.81 +
                            (parseFloat(all[5][i][1]) + parseFloat(all[8][i][1])) / 2 * 1.7 +
                            (parseFloat(all[6][i][1]) + parseFloat(all[9][i][1])) / 2 * 1.7 +
                            (parseFloat(all[8][i][1]) + parseFloat(all[10][i][1]) + parseFloat(all[19][i][1])) / 3 * 1.01 +
                            (parseFloat(all[9][i][1]) + parseFloat(all[11][i][1]) + parseFloat(all[20][i][1])) / 3 * 1.01 +
                            (parseFloat(all[33][i][1])) / 1 * 0.38 +
                            (parseFloat(all[34][i][1])) / 1 * 0.38 +
                            (parseFloat(all[15][i][1]) + parseFloat(all[17][i][1]) + parseFloat(all[21][i][1]) + parseFloat(all[23][i][1])) / 4 * 6.93 +
                            (parseFloat(all[16][i][1]) + parseFloat(all[18][i][1]) + parseFloat(all[22][i][1]) + parseFloat(all[24][i][1])) / 4 * 6.93 +
                            (parseFloat(all[23][i][1]) + parseFloat(all[25][i][1]) + parseFloat(all[27][i][1])) / 3 * 3.21 +
                            (parseFloat(all[24][i][1]) + parseFloat(all[26][i][1]) + parseFloat(all[28][i][1])) / 3 * 3.21 +
                            (parseFloat(all[27][i][1]) + parseFloat(all[29][i][1]) + parseFloat(all[30][i][1])) / 3 * 0.693 +
                            (parseFloat(all[28][i][1]) + parseFloat(all[31][i][1]) + parseFloat(all[32][i][1])) / 3 * 0.693
                            ) / 63.006

                gp[2][i] = (
                            ((parseFloat(all[0][i][2]) + parseFloat(all[1][i][2]) + parseFloat(all[2][i][2]) + parseFloat(all[3][i][2]))) / 4.0 * 4.35 +
                            (parseFloat(all[7][i][2]) + parseFloat(all[14][i][2]) + parseFloat(all[4][i][2]) + parseFloat(all[12][i][2]) + parseFloat(all[13][i][2])) / 5 * 30.81 +
                            (parseFloat(all[5][i][2]) + parseFloat(all[8][i][2])) / 2 * 1.7 +
                            (parseFloat(all[6][i][2]) + parseFloat(all[9][i][2])) / 2 * 1.7 +
                            (parseFloat(all[8][i][2]) + parseFloat(all[10][i][2]) + parseFloat(all[19][i][2])) / 3 * 1.01 +
                            (parseFloat(all[9][i][2]) + parseFloat(all[11][i][2]) + parseFloat(all[20][i][2])) / 3 * 1.01 +
                            (parseFloat(all[33][i][2])) / 1 * 0.38 +
                            (parseFloat(all[34][i][2])) / 1 * 0.38 +
                            (parseFloat(all[15][i][2]) + parseFloat(all[17][i][2]) + parseFloat(all[21][i][2]) + parseFloat(all[23][i][2])) / 4 * 6.93 +
                            (parseFloat(all[16][i][2]) + parseFloat(all[18][i][2]) + parseFloat(all[22][i][2]) + parseFloat(all[24][i][2])) / 4 * 6.93 +
                            (parseFloat(all[23][i][2]) + parseFloat(all[25][i][2]) + parseFloat(all[27][i][2])) / 3 * 3.21 +
                            (parseFloat(all[24][i][2]) + parseFloat(all[26][i][2]) + parseFloat(all[28][i][2])) / 3 * 3.21 +
                            (parseFloat(all[27][i][2]) + parseFloat(all[29][i][2]) + parseFloat(all[30][i][2])) / 3 * 0.693 +
                            (parseFloat(all[28][i][2]) + parseFloat(all[31][i][2]) + parseFloat(all[32][i][2])) / 3 * 0.693
                            ) / 63.006
            }

            for(let i = 0 ; i < 1000 ; i++)
            {
                gp[0][i] = gp[0][i] * 0.01
                gp[1][i] = gp[1][i] * 0.01
                gp[2][i] = gp[2][i] * 0.01
            }

            const material1 = new THREE.PointsMaterial({color: 0x00ffff})
            material1.size = 0.05
            material1.sizeAttenuation = true
            materials.push(material1)

            const material2 = new THREE.PointsMaterial({color: 0xc71585})
            material2.size = 0.05
            material2.sizeAttenuation = true
            materials.push(material2)

            const material3 = new THREE.PointsMaterial({color: 0xffff00})
            material3.size = 0.05
            material3.sizeAttenuation = true
            materials.push(material3)

            const material4 = new THREE.PointsMaterial({color: 0x00ff00})
            material4.size = 0.05
            material4.sizeAttenuation = true
            materials.push(material4)

            const material5 = new THREE.PointsMaterial({color: 0x008080})
            material5.size = 0.05
            material5.sizeAttenuation = true
            materials.push(material5)

            const material6 = new THREE.PointsMaterial({color: 0x2f4f4f})
            material6.size = 0.05
            material6.sizeAttenuation = true
            materials.push(material6)

            const material7 = new THREE.PointsMaterial({color: 0x006400})
            material7.size = 0.05
            material7.sizeAttenuation = true
            materials.push(material7)

            const material8 = new THREE.PointsMaterial({color: 0x008000})
            material8.size = 0.05
            material8.sizeAttenuation = true
            materials.push(material8)

            const material9 = new THREE.PointsMaterial({color: 0x7fffd4})
            material9.size = 0.05
            material9.sizeAttenuation = true
            materials.push(material9)

            const material10 = new THREE.PointsMaterial({color: 0x98fb98})
            material10.size = 0.05
            material10.sizeAttenuation = true
            materials.push(material10)

            const material11 = new THREE.PointsMaterial({color: 0x90ee90})
            material11.size = 0.05
            material11.sizeAttenuation = true
            materials.push(material11)

            const material12 = new THREE.PointsMaterial({color: 0x00ff7f})
            material12.size = 0.05
            material12.sizeAttenuation = true
            materials.push(material12)

            const material13 = new THREE.PointsMaterial({color: 0x00fa9a})
            material13.size = 0.05
            material13.sizeAttenuation = true
            materials.push(material13)

            const material14 = new THREE.PointsMaterial({color: 0xffa500})
            material14.size = 0.05
            material14.sizeAttenuation = true
            materials.push(material14)

            const material15 = new THREE.PointsMaterial({color: 0xf4a460})
            material15.size = 0.05
            material15.sizeAttenuation = true
            materials.push(material15)

            const material16 = new THREE.PointsMaterial({color: 0xff8c00})
            material16.size = 0.05
            material16.sizeAttenuation = true
            materials.push(material16)

            const material17 = new THREE.PointsMaterial({color: 0xdaa520})
            material17.size = 0.05
            material17.sizeAttenuation = true
            materials.push(material17)

            const material18 = new THREE.PointsMaterial({color: 0xcd853f})
            material18.size = 0.05
            material18.sizeAttenuation = true
            materials.push(material18)

            const material19 = new THREE.PointsMaterial({color: 0xb8860b})
            material19.size = 0.05
            material19.sizeAttenuation = true
            materials.push(material19)

            const material20 = new THREE.PointsMaterial({color: 0x20b2aa})
            material20.size = 0.05
            material20.sizeAttenuation = true
            materials.push(material20)

            const material21 = new THREE.PointsMaterial({color: 0x5f9ea0})
            material21.size = 0.05
            material21.sizeAttenuation = true
            materials.push(material21)

            const material22 = new THREE.PointsMaterial({color: 0xdda0dd})
            material22.size = 0.05
            material22.sizeAttenuation = true
            materials.push(material22)

            const material23 = new THREE.PointsMaterial({color: 0xda70d6})
            material23.size = 0.05
            material23.sizeAttenuation = true
            materials.push(material23)

            const material24 = new THREE.PointsMaterial({color: 0xba55d3})
            material24.size = 0.05
            material24.sizeAttenuation = true
            materials.push(material24)

            const material25 = new THREE.PointsMaterial({color: 0x9932cc})
            material25.size = 0.05
            material25.sizeAttenuation = true
            materials.push(material25)

            const material26 = new THREE.PointsMaterial({color: 0x9400d3})
            material26.size = 0.05
            material26.sizeAttenuation = true
            materials.push(material26)

            const material27 = new THREE.PointsMaterial({color: 0x8b008b})
            material27.size = 0.05
            material27.sizeAttenuation = true
            materials.push(material27)

            const material28 = new THREE.PointsMaterial({color: 0x800080})
            material28.size = 0.05
            material28.sizeAttenuation = true
            materials.push(material28)

            const material29 = new THREE.PointsMaterial({color: 0x4b0082})
            material29.size = 0.05
            material29.sizeAttenuation = true
            materials.push(material29)

            const material30 = new THREE.PointsMaterial({color: 0x483d3b})
            material30.size = 0.05
            material30.sizeAttenuation = true
            materials.push(material30)

            const material31 = new THREE.PointsMaterial({color: 0x8a2be2})
            material31.size = 0.05
            material31.sizeAttenuation = true
            materials.push(material31)

            const material32 = new THREE.PointsMaterial({color: 0x9370db})
            material32.size = 0.05
            material32.sizeAttenuation = true
            materials.push(material32)

            const material33 = new THREE.PointsMaterial({color: 0x6a5acd})
            material33.size = 0.05
            material33.sizeAttenuation = true
            materials.push(material33)

            const material34 = new THREE.PointsMaterial({color: 0xff7f50})
            material34.size = 0.05
            material34.sizeAttenuation = true
            materials.push(material34)

            const material35 = new THREE.PointsMaterial({color: 0xff6347})
            material35.size = 0.05
            material35.sizeAttenuation = true
            materials.push(material35)

            const gp_material = new THREE.PointsMaterial({color: 0x00bfff})
            gp_material.size = 0.05
            gp_material.sizeAttenuation = true

            for(let z = 0 ; z < numbers.number1 ; z++)
            {
                for(let i = 0 ; i < 1000 ; i++)
                {
                    let position = new Float32Array(3)

                    position[0] = all[z][i][0] * 0.01
                    position[1] = all[z][i][1] * 0.01
                    position[2] = all[z][i][2] * 0.01

                    positions = positions.concat(position)
                }    
            }

            for(let z = 0 ; z < numbers.number1 ; z++)
            {
                for(let i = 0 ; i < 1000 ; i++)
                {
                    let geometry = new THREE.BufferGeometry()

                    geometry.setAttribute('position', new THREE.BufferAttribute(positions[(z * 1000) + i], 3))

                    geometries = geometries.concat(geometry)
                }    
            }

            for(let i = 0 ; i < 1000 ; i++)
            {
                let gp_position = new Float32Array(3)
                gp_position[0] = gp[0][i]
                gp_position[1] = gp[1][i]
                gp_position[2] = gp[2][i]

                let gp_geometry = new THREE.BufferGeometry()
                gp_geometry.setAttribute('position', new THREE.BufferAttribute(gp_position, 3))

                gp_geometries = gp_geometries.concat(gp_geometry)
            }

            for(let z = 0 ; z < numbers.number1 ; z++)
            {
                for(let i = 0 ; i < 1000 ; i++)
                {
                    let particle = new THREE.Points(geometries[(z * 1000) + i], materials[z])

                    particles.push(particle)
                }    
            }

            for(let i = 0 ; i < 1000 ; i++)
            {
                let gp_particle = new THREE.Points(gp_geometries[i], gp_material)

                gp_particles.push(gp_particle)
            }

            const lineMaterial = new THREE.LineBasicMaterial({color: 0xffd700})
            const lines = []

            for(let i = 0 ; i < 1000 ; i++)
            {
                let LFHD = new THREE.Vector3(all[0][i][0] * 0.01, all[0][i][1] * 0.01, all[0][i][2] * 0.01)
                let RFHD = new THREE.Vector3(all[1][i][0] * 0.01, all[1][i][1] * 0.01, all[1][i][2] * 0.01)
                let LBHD = new THREE.Vector3(all[2][i][0] * 0.01, all[2][i][1] * 0.01, all[2][i][2] * 0.01)
                let RBHD = new THREE.Vector3(all[3][i][0] * 0.01, all[3][i][1] * 0.01, all[3][i][2] * 0.01)
                let CLAV = new THREE.Vector3(all[4][i][0] * 0.01, all[4][i][1] * 0.01, all[4][i][2] * 0.01)
                let LSHO = new THREE.Vector3(all[5][i][0] * 0.01, all[5][i][1] * 0.01, all[5][i][2] * 0.01)
                let RSHO = new THREE.Vector3(all[6][i][0] * 0.01, all[6][i][1] * 0.01, all[6][i][2] * 0.01)
                let C7 = new THREE.Vector3(all[7][i][0] * 0.01, all[7][i][1] * 0.01, all[7][i][2] * 0.01)
                let LELB = new THREE.Vector3(all[8][i][0] * 0.01, all[8][i][1] * 0.01, all[8][i][2] * 0.01)
                let RELB = new THREE.Vector3(all[9][i][0] * 0.01, all[9][i][1] * 0.01, all[9][i][2] * 0.01)
                let LWRA = new THREE.Vector3(all[10][i][0] * 0.01, all[10][i][1] * 0.01, all[10][i][2] * 0.01)
                let RWRA = new THREE.Vector3(all[11][i][0] * 0.01, all[11][i][1] * 0.01, all[11][i][2] * 0.01)
                let STRN = new THREE.Vector3(all[12][i][0] * 0.01, all[12][i][1] * 0.01, all[12][i][2] * 0.01)
                let RBAK = new THREE.Vector3(all[13][i][0] * 0.01, all[13][i][1] * 0.01, all[13][i][2] * 0.01)
                let T10 = new THREE.Vector3(all[14][i][0] * 0.01, all[14][i][1] * 0.01, all[14][i][2] * 0.01)
                let LASI = new THREE.Vector3(all[15][i][0] * 0.01, all[15][i][1] * 0.01, all[15][i][2] * 0.01)
                let RASI = new THREE.Vector3(all[16][i][0] * 0.01, all[16][i][1] * 0.01, all[16][i][2] * 0.01)
                let LPSI = new THREE.Vector3(all[17][i][0] * 0.01, all[17][i][1] * 0.01, all[17][i][2] * 0.01)
                let RPSI = new THREE.Vector3(all[18][i][0] * 0.01, all[18][i][1] * 0.01, all[18][i][2] * 0.01)
                let LWRB = new THREE.Vector3(all[19][i][0] * 0.01, all[19][i][1] * 0.01, all[19][i][2] * 0.01)
                let RWRB = new THREE.Vector3(all[20][i][0] * 0.01, all[20][i][1] * 0.01, all[20][i][2] * 0.01)
                let LTHI = new THREE.Vector3(all[21][i][0] * 0.01, all[21][i][1] * 0.01, all[21][i][2] * 0.01)
                let RTHI = new THREE.Vector3(all[22][i][0] * 0.01, all[22][i][1] * 0.01, all[22][i][2] * 0.01)
                let LKNE = new THREE.Vector3(all[23][i][0] * 0.01, all[23][i][1] * 0.01, all[23][i][2] * 0.01)
                let RKNE = new THREE.Vector3(all[24][i][0] * 0.01, all[24][i][1] * 0.01, all[24][i][2] * 0.01)
                let LTIB = new THREE.Vector3(all[25][i][0] * 0.01, all[25][i][1] * 0.01, all[25][i][2] * 0.01)
                let RTIB = new THREE.Vector3(all[26][i][0] * 0.01, all[26][i][1] * 0.01, all[26][i][2] * 0.01)
                let LANK = new THREE.Vector3(all[27][i][0] * 0.01, all[27][i][1] * 0.01, all[27][i][2] * 0.01)
                let RANK = new THREE.Vector3(all[28][i][0] * 0.01, all[28][i][1] * 0.01, all[28][i][2] * 0.01)
                let LHEE = new THREE.Vector3(all[29][i][0] * 0.01, all[29][i][1] * 0.01, all[29][i][2] * 0.01)
                let LTOE = new THREE.Vector3(all[30][i][0] * 0.01, all[30][i][1] * 0.01, all[30][i][2] * 0.01)
                let RHEE = new THREE.Vector3(all[31][i][0] * 0.01, all[31][i][1] * 0.01, all[31][i][2] * 0.01)
                let RTOE = new THREE.Vector3(all[32][i][0] * 0.01, all[32][i][1] * 0.01, all[32][i][2] * 0.01)
                let LFIN = new THREE.Vector3(all[33][i][0] * 0.01, all[33][i][1] * 0.01, all[33][i][2] * 0.01)
                let RFIN = new THREE.Vector3(all[34][i][0] * 0.01, all[34][i][1] * 0.01, all[34][i][2] * 0.01)

                let forlineGeometry1 = []
                forlineGeometry1[0] = LFHD
                forlineGeometry1[1] = RFHD
                let lineGeometry1 = new THREE.BufferGeometry().setFromPoints(forlineGeometry1)
                lines[(0 * 1000) + i] = new THREE.Line(lineGeometry1, lineMaterial)

                let forlineGeometry2 = []
                forlineGeometry2[0] = LFHD
                forlineGeometry2[1] = LBHD
                let lineGeometry2 = new THREE.BufferGeometry().setFromPoints(forlineGeometry2)
                lines[(1 * 1000) + i] = new THREE.Line(lineGeometry2, lineMaterial)

                
                let forlineGeometry3 = []
                forlineGeometry3[0] = RFHD
                forlineGeometry3[1] = RBHD
                let lineGeometry3 = new THREE.BufferGeometry().setFromPoints(forlineGeometry3)
                lines[(2 * 1000) + i] = new THREE.Line(lineGeometry3, lineMaterial)
                
                let forlineGeometry4 = []
                forlineGeometry4[0] = LBHD
                forlineGeometry4[1] = RBHD
                let lineGeometry4 = new THREE.BufferGeometry().setFromPoints(forlineGeometry4)
                lines[(3 * 1000) + i] = new THREE.Line(lineGeometry4, lineMaterial)

                let forlineGeometry5 = []
                forlineGeometry5[0] = CLAV
                forlineGeometry5[1] = LSHO
                let lineGeometry5 = new THREE.BufferGeometry().setFromPoints(forlineGeometry5)
                lines[(4 * 1000) + i] = new THREE.Line(lineGeometry5, lineMaterial)

                let forlineGeometry6 = []
                forlineGeometry6[0] = CLAV
                forlineGeometry6[1] = RSHO
                let lineGeometry6 = new THREE.BufferGeometry().setFromPoints(forlineGeometry6)
                lines[(5 * 1000) + i] = new THREE.Line(lineGeometry6, lineMaterial)

                let forlineGeometry7 = []
                forlineGeometry7[0] = C7
                forlineGeometry7[1] = LSHO
                let lineGeometry7 = new THREE.BufferGeometry().setFromPoints(forlineGeometry7)
                lines[(6 * 1000) + i] = new THREE.Line(lineGeometry7, lineMaterial)

                let forlineGeometry8 = []
                forlineGeometry8[0] = C7
                forlineGeometry8[1] = RSHO
                let lineGeometry8 = new THREE.BufferGeometry().setFromPoints(forlineGeometry8)
                lines[(7 * 1000) + i] = new THREE.Line(lineGeometry8, lineMaterial)

                let forlineGeometry9 = []
                forlineGeometry9[0] = LSHO
                forlineGeometry9[1] = LELB
                let lineGeometry9 = new THREE.BufferGeometry().setFromPoints(forlineGeometry9)
                lines[(8 * 1000) + i] = new THREE.Line(lineGeometry9, lineMaterial)

                let forlineGeometry10 = []
                forlineGeometry10[0] = RSHO
                forlineGeometry10[1] = RELB
                let lineGeometry10 = new THREE.BufferGeometry().setFromPoints(forlineGeometry10)
                lines[(9 * 1000) + i] = new THREE.Line(lineGeometry10, lineMaterial)

                let forlineGeometry11 = []
                forlineGeometry11[0] = LELB
                forlineGeometry11[1] = LWRB
                let lineGeometry11 = new THREE.BufferGeometry().setFromPoints(forlineGeometry11)
                lines[(10 * 1000) + i] = new THREE.Line(lineGeometry11, lineMaterial)

                let forlineGeometry12 = []
                forlineGeometry12[0] = RELB
                forlineGeometry12[1] = RWRB
                let lineGeometry12 = new THREE.BufferGeometry().setFromPoints(forlineGeometry12)
                lines[(11 * 1000) + i] = new THREE.Line(lineGeometry12, lineMaterial)

                let forlineGeometry13 = []
                forlineGeometry13[0] = CLAV
                forlineGeometry13[1] = STRN
                let lineGeometry13 = new THREE.BufferGeometry().setFromPoints(forlineGeometry13)
                lines[(12 * 1000) + i] = new THREE.Line(lineGeometry13, lineMaterial)

                let forlineGeometry14 = []
                forlineGeometry14[0] = C7
                forlineGeometry14[1] = RBAK
                let lineGeometry14 = new THREE.BufferGeometry().setFromPoints(forlineGeometry14)
                lines[(13 * 1000) + i] = new THREE.Line(lineGeometry14, lineMaterial)

                let forlineGeometry15 = []
                forlineGeometry15[0] = RBAK
                forlineGeometry15[1] = T10
                let lineGeometry15 = new THREE.BufferGeometry().setFromPoints(forlineGeometry15)
                lines[(14 * 1000) + i] = new THREE.Line(lineGeometry15, lineMaterial)

                let forlineGeometry16 = []
                forlineGeometry16[0] = STRN
                forlineGeometry16[1] = LASI
                let lineGeometry16 = new THREE.BufferGeometry().setFromPoints(forlineGeometry16)
                lines[(15 * 1000) + i] = new THREE.Line(lineGeometry16, lineMaterial)

                let forlineGeometry17 = []
                forlineGeometry17[0] = STRN
                forlineGeometry17[1] = RASI
                let lineGeometry17 = new THREE.BufferGeometry().setFromPoints(forlineGeometry17)
                lines[(16 * 1000) + i] = new THREE.Line(lineGeometry17, lineMaterial)

                let forlineGeometry18 = []
                forlineGeometry18[0] = LASI
                forlineGeometry18[1] = LPSI
                let lineGeometry18 = new THREE.BufferGeometry().setFromPoints(forlineGeometry18)
                lines[(17 * 1000) + i] = new THREE.Line(lineGeometry18, lineMaterial)

                let forlineGeometry19 = []
                forlineGeometry19[0] = RASI
                forlineGeometry19[1] = RPSI
                let lineGeometry19 = new THREE.BufferGeometry().setFromPoints(forlineGeometry19)
                lines[(18 * 1000) + i] = new THREE.Line(lineGeometry19, lineMaterial)

                let forlineGeometry20 = []
                forlineGeometry20[0] = LPSI
                forlineGeometry20[1] = RPSI
                let lineGeometry20 = new THREE.BufferGeometry().setFromPoints(forlineGeometry20)
                lines[(19 * 1000) + i] = new THREE.Line(lineGeometry20, lineMaterial)

                let forlineGeometry21 = []
                forlineGeometry21[0] = LASI
                forlineGeometry21[1] = RASI
                let lineGeometry21 = new THREE.BufferGeometry().setFromPoints(forlineGeometry21)
                lines[(20 * 1000) + i] = new THREE.Line(lineGeometry21, lineMaterial)

                let forlineGeometry22 = []
                forlineGeometry22[0] = LWRA
                forlineGeometry22[1] = LWRB
                let lineGeometry22 = new THREE.BufferGeometry().setFromPoints(forlineGeometry22)
                lines[(21 * 1000) + i] = new THREE.Line(lineGeometry22, lineMaterial)

                let forlineGeometry23 = []
                forlineGeometry23[0] = RWRA
                forlineGeometry23[1] = RWRB
                let lineGeometry23 = new THREE.BufferGeometry().setFromPoints(forlineGeometry23)
                lines[(22 * 1000) + i] = new THREE.Line(lineGeometry23, lineMaterial)

                let forlineGeometry24 = []
                forlineGeometry24[0] = LASI
                forlineGeometry24[1] = LTHI
                let lineGeometry24 = new THREE.BufferGeometry().setFromPoints(forlineGeometry24)
                lines[(23 * 1000) + i] = new THREE.Line(lineGeometry24, lineMaterial)

                let forlineGeometry25 = []
                forlineGeometry25[0] = RASI
                forlineGeometry25[1] = RTHI
                let lineGeometry25 = new THREE.BufferGeometry().setFromPoints(forlineGeometry25)
                lines[(24 * 1000) + i] = new THREE.Line(lineGeometry25, lineMaterial)

                let forlineGeometry26 = []
                forlineGeometry26[0] = LTHI
                forlineGeometry26[1] = LKNE
                let lineGeometry26 = new THREE.BufferGeometry().setFromPoints(forlineGeometry26)
                lines[(25 * 1000) + i] = new THREE.Line(lineGeometry26, lineMaterial)

                let forlineGeometry27 = []
                forlineGeometry27[0] = RTHI
                forlineGeometry27[1] = RKNE
                let lineGeometry27 = new THREE.BufferGeometry().setFromPoints(forlineGeometry27)
                lines[(26 * 1000) + i] = new THREE.Line(lineGeometry27, lineMaterial)

                let forlineGeometry28 = []
                forlineGeometry28[0] = LKNE
                forlineGeometry28[1] = LTIB
                let lineGeometry28 = new THREE.BufferGeometry().setFromPoints(forlineGeometry28)
                lines[(27 * 1000) + i] = new THREE.Line(lineGeometry28, lineMaterial)

                let forlineGeometry29 = []
                forlineGeometry29[0] = RKNE
                forlineGeometry29[1] = RTIB
                let lineGeometry29 = new THREE.BufferGeometry().setFromPoints(forlineGeometry29)
                lines[(28 * 1000) + i] = new THREE.Line(lineGeometry29, lineMaterial)

                let forlineGeometry30 = []
                forlineGeometry30[0] = LTIB
                forlineGeometry30[1] = LANK
                let lineGeometry30 = new THREE.BufferGeometry().setFromPoints(forlineGeometry30)
                lines[(29 * 1000) + i] = new THREE.Line(lineGeometry30, lineMaterial)

                let forlineGeometry31 = []
                forlineGeometry31[0] = RTIB
                forlineGeometry31[1] = RANK
                let lineGeometry31 = new THREE.BufferGeometry().setFromPoints(forlineGeometry31)
                lines[(30 * 1000) + i] = new THREE.Line(lineGeometry31, lineMaterial)

                let forlineGeometry32 = []
                forlineGeometry32[0] = LANK
                forlineGeometry32[1] = LHEE
                let lineGeometry32 = new THREE.BufferGeometry().setFromPoints(forlineGeometry32)
                lines[(31 * 1000) + i] = new THREE.Line(lineGeometry32, lineMaterial)

                let forlineGeometry33 = []
                forlineGeometry33[0] = LHEE
                forlineGeometry33[1] = LTOE
                let lineGeometry33 = new THREE.BufferGeometry().setFromPoints(forlineGeometry33)
                lines[(32 * 1000) + i] = new THREE.Line(lineGeometry33, lineMaterial)

                let forlineGeometry34 = []
                forlineGeometry34[0] = RANK
                forlineGeometry34[1] = RHEE
                let lineGeometry34 = new THREE.BufferGeometry().setFromPoints(forlineGeometry34)
                lines[(33 * 1000) + i] = new THREE.Line(lineGeometry34, lineMaterial)

                let forlineGeometry35 = []
                forlineGeometry35[0] = RHEE
                forlineGeometry35[1] = RTOE
                let lineGeometry35 = new THREE.BufferGeometry().setFromPoints(forlineGeometry35)
                lines[(34 * 1000) + i] = new THREE.Line(lineGeometry35, lineMaterial)

                let forlineGeometry36 = []
                forlineGeometry36[0] = LFHD
                forlineGeometry36[1] = RBHD
                let lineGeometry36 = new THREE.BufferGeometry().setFromPoints(forlineGeometry36)
                lines[(35 * 1000) + i] = new THREE.Line(lineGeometry36, lineMaterial)

                let forlineGeometry37 = []
                forlineGeometry37[0] = RFHD
                forlineGeometry37[1] = LBHD
                let lineGeometry37 = new THREE.BufferGeometry().setFromPoints(forlineGeometry37)
                lines[(36 * 1000) + i] = new THREE.Line(lineGeometry37, lineMaterial)

                let forlineGeometry38 = []
                forlineGeometry38[0] = C7
                forlineGeometry38[1] = T10
                let lineGeometry38 = new THREE.BufferGeometry().setFromPoints(forlineGeometry38)
                lines[(37 * 1000) + i] = new THREE.Line(lineGeometry38, lineMaterial)

                let forlineGeometry39 = []
                forlineGeometry39[0] = T10
                forlineGeometry39[1] = LPSI
                let lineGeometry39 = new THREE.BufferGeometry().setFromPoints(forlineGeometry39)
                lines[(38 * 1000) + i] = new THREE.Line(lineGeometry39, lineMaterial)

                let forlineGeometry40 = []
                forlineGeometry40[0] = T10
                forlineGeometry40[1] = RPSI
                let lineGeometry40 = new THREE.BufferGeometry().setFromPoints(forlineGeometry40)
                lines[(39 * 1000) + i] = new THREE.Line(lineGeometry40, lineMaterial)

                let forlineGeometry41 = []
                forlineGeometry41[0] = LSHO
                forlineGeometry41[1] = RSHO
                let lineGeometry41 = new THREE.BufferGeometry().setFromPoints(forlineGeometry41)
                lines[(40 * 1000) + i] = new THREE.Line(lineGeometry41, lineMaterial)

                let forlineGeometry42 = []
                forlineGeometry42[0] = LPSI
                forlineGeometry42[1] = LTHI
                let lineGeometry42 = new THREE.BufferGeometry().setFromPoints(forlineGeometry42)
                lines[(41 * 1000) + i] = new THREE.Line(lineGeometry42, lineMaterial)

                let forlineGeometry43 = []
                forlineGeometry43[0] = RPSI
                forlineGeometry43[1] = RTHI
                let lineGeometry43 = new THREE.BufferGeometry().setFromPoints(forlineGeometry43)
                lines[(42 * 1000) + i] = new THREE.Line(lineGeometry43, lineMaterial)

                let forlineGeometry44 = []
                forlineGeometry44[0] = LASI
                forlineGeometry44[1] = RPSI
                let lineGeometry44 = new THREE.BufferGeometry().setFromPoints(forlineGeometry44)
                lines[(43 * 1000) + i] = new THREE.Line(lineGeometry44, lineMaterial)

                let forlineGeometry45 = []
                forlineGeometry45[0] = RASI
                forlineGeometry45[1] = LPSI
                let lineGeometry45 = new THREE.BufferGeometry().setFromPoints(forlineGeometry45)
                lines[(44 * 1000) + i] = new THREE.Line(lineGeometry45, lineMaterial)

                let forlineGeometry46 = []
                forlineGeometry46[0] = LWRA
                forlineGeometry46[1] = LFIN
                let lineGeometry46 = new THREE.BufferGeometry().setFromPoints(forlineGeometry46)
                lines[(45 * 1000) + i] = new THREE.Line(lineGeometry46, lineMaterial)

                let forlineGeometry47 = []
                forlineGeometry47[0] = RWRA
                forlineGeometry47[1] = RFIN
                let lineGeometry47 = new THREE.BufferGeometry().setFromPoints(forlineGeometry47)
                lines[(46 * 1000) + i] = new THREE.Line(lineGeometry47, lineMaterial)

                let forlineGeometry48 = []
                forlineGeometry48[0] = LWRB
                forlineGeometry48[1] = LFIN
                let lineGeometry48 = new THREE.BufferGeometry().setFromPoints(forlineGeometry48)
                lines[(47 * 1000) + i] = new THREE.Line(lineGeometry48, lineMaterial)

                let forlineGeometry49 = []
                forlineGeometry49[0] = RWRB
                forlineGeometry49[1] = RFIN
                let lineGeometry49 = new THREE.BufferGeometry().setFromPoints(forlineGeometry49)
                lines[(48 * 1000) + i] = new THREE.Line(lineGeometry49, lineMaterial)

                let forlineGeometry50 = []
                forlineGeometry50[0] = LELB
                forlineGeometry50[1] = LWRA
                let lineGeometry50 = new THREE.BufferGeometry().setFromPoints(forlineGeometry50)
                lines[(49 * 1000) + i] = new THREE.Line(lineGeometry50, lineMaterial)

                let forlineGeometry51 = []
                forlineGeometry51[0] = RELB
                forlineGeometry51[1] = RWRA
                let lineGeometry51 = new THREE.BufferGeometry().setFromPoints(forlineGeometry51)
                lines[(50 * 1000) + i] = new THREE.Line(lineGeometry51, lineMaterial)
            }

            let count = 0

            const tick = () => 
            {
                count++
                console.log(count)

                ///各部位の軌跡を表示する場合はコメントアウトを外してください
                /*scene.add(particles[0 + count])
                scene.add(particles[1000 + count])
                scene.add(particles[2000 + count])
                scene.add(particles[3000 + count])
                scene.add(particles[4000 + count])
                scene.add(particles[5000 + count])
                scene.add(particles[6000 + count])
                scene.add(particles[7000 + count])
                scene.add(particles[8000 + count])
                scene.add(particles[9000 + count])
                scene.add(particles[10000 + count])
                scene.add(particles[11000 + count])
                scene.add(particles[12000 + count])
                scene.add(particles[13000 + count])
                scene.add(particles[14000 + count])
                scene.add(particles[15000 + count])
                scene.add(particles[16000 + count])
                scene.add(particles[17000 + count])
                scene.add(particles[18000 + count])
                scene.add(particles[19000 + count])
                scene.add(particles[20000 + count])
                scene.add(particles[21000 + count])
                scene.add(particles[22000 + count])
                scene.add(particles[23000 + count])
                scene.add(particles[24000 + count])
                scene.add(particles[25000 + count])
                scene.add(particles[26000 + count])
                scene.add(particles[27000 + count])
                scene.add(particles[28000 + count])
                scene.add(particles[29000 + count])
                scene.add(particles[30000 + count])
                scene.add(particles[31000 + count])
                scene.add(particles[32000 + count])
                scene.add(particles[33000 + count])
                scene.add(particles[34000 + count])*/
                scene.add(gp_particles[0 + count]) //重心の軌跡のみ表示
        
                scene.add(lines[0 + count])
                scene.add(lines[1000 + count])
                scene.add(lines[2000 + count])
                scene.add(lines[3000 + count])
                scene.add(lines[4000 + count])
                scene.add(lines[5000 + count])
                scene.add(lines[6000 + count])
                scene.add(lines[7000 + count])
                scene.add(lines[8000 + count])
                scene.add(lines[9000 + count])
                scene.add(lines[10000 + count])
                scene.add(lines[11000 + count])
                scene.add(lines[12000 + count])
                scene.add(lines[13000 + count])
                scene.add(lines[14000 + count])
                scene.add(lines[15000 + count])
                scene.add(lines[16000 + count])
                scene.add(lines[17000 + count])
                scene.add(lines[18000 + count])
                scene.add(lines[19000 + count])
                scene.add(lines[20000 + count])
                scene.add(lines[21000 + count])
                scene.add(lines[22000 + count])
                scene.add(lines[23000 + count])
                scene.add(lines[24000 + count])
                scene.add(lines[25000 + count])
                scene.add(lines[26000 + count])
                scene.add(lines[27000 + count])
                scene.add(lines[28000 + count])
                scene.add(lines[29000 + count])
                scene.add(lines[30000 + count])
                scene.add(lines[31000 + count])
                scene.add(lines[32000 + count])
                scene.add(lines[33000 + count])
                scene.add(lines[34000 + count])
                scene.add(lines[35000 + count])
                scene.add(lines[36000 + count])
                scene.add(lines[37000 + count])
                scene.add(lines[38000 + count])
                scene.add(lines[39000 + count])
                scene.add(lines[40000 + count])
                scene.add(lines[41000 + count])
                scene.add(lines[42000 + count])
                scene.add(lines[43000 + count])
                scene.add(lines[44000 + count])
                scene.add(lines[45000 + count])
                scene.add(lines[46000 + count])
                scene.add(lines[47000 + count])
                scene.add(lines[48000 + count])
                scene.add(lines[49000 + count])
                scene.add(lines[50000 + count])

                //これは各部位の軌跡を非表示にするのに用いる
                /*scene.remove(particles[(0 + count) - 1])
                scene.remove(particles[(1000 + count) - 1])
                scene.remove(particles[(2000 + count) - 1])
                scene.remove(particles[(3000 + count) - 1])
                scene.remove(particles[(4000 + count) - 1])
                scene.remove(particles[(5000 + count) - 1])
                scene.remove(particles[(6000 + count) - 1])
                scene.remove(particles[(7000 + count) - 1])
                scene.remove(particles[(8000 + count) - 1])
                scene.remove(particles[(9000 + count) - 1])
                scene.remove(particles[(10000 + count) - 1])
                scene.remove(particles[(11000 + count) - 1])
                scene.remove(particles[(12000 + count) - 1])
                scene.remove(particles[(13000 + count) - 1])
                scene.remove(particles[(14000 + count) - 1])
                scene.remove(particles[(15000 + count) - 1])
                scene.remove(particles[(16000 + count) - 1])
                scene.remove(particles[(17000 + count) - 1])
                scene.remove(particles[(18000 + count) - 1])
                scene.remove(particles[(19000 + count) - 1])
                scene.remove(particles[(20000 + count) - 1])
                scene.remove(particles[(21000 + count) - 1])
                scene.remove(particles[(22000 + count) - 1])
                scene.remove(particles[(23000 + count) - 1])
                scene.remove(particles[(24000 + count) - 1])
                scene.remove(particles[(25000 + count) - 1])
                scene.remove(particles[(26000 + count) - 1])
                scene.remove(particles[(27000 + count) - 1])
                scene.remove(particles[(28000 + count) - 1])
                scene.remove(particles[(29000 + count) - 1])
                scene.remove(particles[(30000 + count) - 1])
                scene.remove(particles[(31000 + count) - 1])
                scene.remove(particles[(32000 + count) - 1])
                scene.remove(particles[(33000 + count) - 1])
                scene.remove(particles[(34000 + count) - 1])*/
                //scene.remove(gp_particles[(0 + count) - 1])

                scene.remove(lines[(0 + count) - 1])
                scene.remove(lines[(1000 + count) - 1])
                scene.remove(lines[(2000 + count) - 1])
                scene.remove(lines[(3000 + count) - 1])
                scene.remove(lines[(4000 + count) - 1])
                scene.remove(lines[(5000 + count) - 1])
                scene.remove(lines[(6000 + count) - 1])
                scene.remove(lines[(7000 + count) - 1])
                scene.remove(lines[(8000 + count) - 1])
                scene.remove(lines[(9000 + count) - 1])
                scene.remove(lines[(10000 + count) - 1])
                scene.remove(lines[(11000 + count) - 1])
                scene.remove(lines[(12000 + count) - 1])
                scene.remove(lines[(13000 + count) - 1])
                scene.remove(lines[(14000 + count) - 1])
                scene.remove(lines[(15000 + count) - 1])
                scene.remove(lines[(16000 + count) - 1])
                scene.remove(lines[(17000 + count) - 1])
                scene.remove(lines[(18000 + count) - 1])
                scene.remove(lines[(19000 + count) - 1])
                scene.remove(lines[(20000 + count) - 1])
                scene.remove(lines[(21000 + count) - 1])
                scene.remove(lines[(22000 + count) - 1])
                scene.remove(lines[(23000 + count) - 1])
                scene.remove(lines[(24000 + count) - 1])
                scene.remove(lines[(25000 + count) - 1])
                scene.remove(lines[(26000 + count) - 1])
                scene.remove(lines[(27000 + count) - 1])
                scene.remove(lines[(28000 + count) - 1])
                scene.remove(lines[(29000 + count) - 1])
                scene.remove(lines[(30000 + count) - 1])
                scene.remove(lines[(31000 + count) - 1])
                scene.remove(lines[(32000 + count) - 1])
                scene.remove(lines[(33000 + count) - 1])
                scene.remove(lines[(34000 + count) - 1])
                scene.remove(lines[(35000 + count) - 1])
                scene.remove(lines[(36000 + count) - 1])
                scene.remove(lines[(37000 + count) - 1])
                scene.remove(lines[(38000 + count) - 1])
                scene.remove(lines[(39000 + count) - 1])
                scene.remove(lines[(40000 + count) - 1])
                scene.remove(lines[(41000 + count) - 1])
                scene.remove(lines[(42000 + count) - 1])
                scene.remove(lines[(43000 + count) - 1])
                scene.remove(lines[(44000 + count) - 1])
                scene.remove(lines[(45000 + count) - 1])
                scene.remove(lines[(46000 + count) - 1])
                scene.remove(lines[(47000 + count) - 1])
                scene.remove(lines[(48000 + count) - 1])
                scene.remove(lines[(49000 + count) - 1])
                scene.remove(lines[(50000 + count) - 1])

                window.requestAnimationFrame(tick)
            }

            tick()
        }
    }

    getCSV()

    return (
        <>
           
        </>
    )
}

export default Calculator