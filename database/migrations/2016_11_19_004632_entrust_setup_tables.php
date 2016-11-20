<?php
use Illuminate\Support\Facades\Schema;
use Moloquent\Schema\Blueprint;

use Illuminate\Database\Migrations\Migration;
class EntrustSetupTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        // Create table for storing roles
        Schema::create('roles', function (Blueprint $collection) {
            $collection->increments('id');
            $collection->string('name')->unique();
            $collection->string('display_name')->nullable();
            $collection->string('description')->nullable();
            $collection->timestamps();
        });

        // Create table for associating roles to users (Many-to-Many)
        Schema::create('role_user', function (Blueprint $collection) {
            $collection->integer('user_id')->unsigned();
            $collection->integer('role_id')->unsigned();

            $collection->foreign('user_id')->references('_id')->on('')
                ->onUpdate('cascade')->onDelete('cascade');
            $collection->foreign('role_id')->references('id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');

            $collection->primary(['user_id', 'role_id']);
        });

        // Create table for storing permissions
        Schema::create('permissions', function (Blueprint $collection) {
            $collection->increments('id');
            $collection->string('name')->unique();
            $collection->string('display_name')->nullable();
            $collection->string('description')->nullable();
            $collection->timestamps();
        });

        // Create table for associating permissions to roles (Many-to-Many)
        Schema::create('permission_role', function (Blueprint $collection) {
            $collection->integer('permission_id')->unsigned();
            $collection->integer('role_id')->unsigned();

            $collection->foreign('permission_id')->references('id')->on('permissions')
                ->onUpdate('cascade')->onDelete('cascade');
            $collection->foreign('role_id')->references('id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');

            $collection->primary(['permission_id', 'role_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return  void
     */
    public function down()
    {
        Schema::drop('permission_role');
        Schema::drop('permissions');
        Schema::drop('role_user');
        Schema::drop('roles');
    }
}
