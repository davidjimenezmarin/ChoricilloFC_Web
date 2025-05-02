<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NoticeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $notices = [
            [
                'title' => '¡Manú Marco deja el fútbol!',	
                'short_description' => 'Manú Marco se retira del fútbol profesional',
                'description' => 'Manú Marco, el emblemático jugador del equipo, ha decidido colgar las botas y retirarse del fútbol profesional. 
                Tras una carrera llena de éxitos (según él) y momentos inolvidables, Manú se despide de los terrenos de juego.',
                'image' => 'notice_default.jpg',
                'date' => now(),
            ],
            [
                'title' => 'Imparable Jorge Miranda',
                'short_description' => 'Jorge Miranda marca un golazo y se apunta un hat-trick',
                'description' => 'El defensa Jorge Miranda ha demostrado su calidad en el último partido, anotando un golazo desde fuera del área y completando un hat-trick.',
                'image' => 'notice_default.jpg',
                'date' => now(),
            ],
            [
                'title' => 'Adrián Zatorre pierde las botas',
                'short_description' => 'Adrián Zatorre pierde las botas en el vestuario',
                'description' => 'El mediocampista Adrián Zatorre ha tenido un pequeño contratiempo en el vestuario, donde ha perdido sus botas antes del partido.
                A pesar de la situación, el equipo ha decidido apoyarlo y le han prestado unas botas de repuesto (creemos que las tiene el Boyan).',
                'image' => 'notice_default.jpg',
                'date' => now(),
            ],
            [
                'title' => 'El Patika se va de fiesta',
                'short_description' => 'El Patika se va de fiesta y no vuelve',
                'description' => 'El jugador Patika ha decidido tomarse un descanso y se ha ido de fiesta sin avisar al equipo.
                Sabemos que es un gran fiestero y que ni pertenece a este equipo pero esta vez se ha pasado de la raya.
                Se rumorea que lo vieron salir del día con 20 botellas de Velero y 8 paquetes de Malboro el pasado viernes.',
                'image' => 'notice_default.jpg',
                'date' => now(),
            ],
            [
                'title' => '¿Quién es el nuevo fichaje?',
                'short_description' => 'El nuevo fichaje del equipo ha llegado y nadie sabe quién es',
                'description' => 'El nuevo fichaje del equipo ha llegado y nadie sabe quién es.
                Se rumorea que es un jugador de renombre, pero nadie ha podido confirmarlo.
                El equipo ha decidido mantener el misterio y no revelar su identidad hasta el próximo partido (se rumorea que podría ser el Duki, vaya decepción).',
                'image' => 'notice_default.jpg',
                'date' => now(),
            ]
        ];

        foreach ($notices as $notice) {
            \App\Models\Notice::create($notice);
        }

    }
}
