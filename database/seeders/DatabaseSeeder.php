<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        collect([
            [
                'name' => 'Roysul Fanani',
                'email' => 'roysulfanani@gmail.com',
                'password' => bcrypt('password'),
                'username' => 'roysulfanani',
            ],
            [
                'name' => 'Nurina Ramadhani',
                'email' => 'nurinaramadhani@gmail.com',
                'password' => bcrypt('password'),
                'username' => 'nurinaramadhani',
            ],
        ])->each(function ($user) {
            User::create($user);
        });
        \App\Models\User::factory(10)->create();
    }
}
