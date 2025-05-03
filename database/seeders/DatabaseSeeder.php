<?php

namespace Database\Seeders;

use App\Models\Player;
use App\Models\User;
use Faker\Provider\ar_EG\Payment;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => '12345678'
        ]);
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => '12345678',
            'is_admin' => true,
        ]);
        User::factory()->create([
            'name' => 'Player User',
            'email' => 'player@example.com',
            'password' => '12345678',
            'is_player' => true,
        ]);

        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
            PaymentMethodSeeder::class,
            PlayerSeeder::class,
            NoticeSeeder::class,
            GameSeeder::class,
            MatchPlayerSeeder::class,
        ]);
    }
}
