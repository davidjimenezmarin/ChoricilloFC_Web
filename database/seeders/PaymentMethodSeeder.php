<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $methods=[
            [
                'name'=>'Tarjeta de crédito',
                'description'=>'Pago a través de tarjeta de crédito de tu entidad financiera',
            ],
            [
                'name'=>'Tarjeta de débito',
                'description'=>'Pago a través de tarjeta de débito de tu entidad financiera',
            ],
            [
                'name'=>'Transferencia bancaria',
                'description'=>'Pago a través de transferencia bancaria',
            ],
            [
                'name'=>'Pago en efectivo',
                'description'=>'Pago en efectivo al recibir el pedido',
            ],
            [
                'name'=>'PayPal',
                'description'=>'Pago a través de PayPal',
            ],
            [
                'name'=>'Bizum',
                'description'=>'Pago a través de Bizum',
            ],
        ];
        foreach($methods as $method){
            \App\Models\PaymentMethod::create($method);
        }
    }
}
