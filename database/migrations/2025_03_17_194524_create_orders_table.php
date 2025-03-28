<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('payment_method_id');
            $table->unsignedBigInteger('shipping_address_id');
            $table->date('order_date');
            $table->decimal('total_amount', 10, 2);
            $table->enum('status', ['pending', 'processing', 'shipped', 'delivered'])->default('pending');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('payment_method_id')->references('id')->on('payment_methods');
            $table->foreign('shipping_address_id')->references('id')->on('shipping_addresses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
