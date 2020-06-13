<?php

namespace App\Http\Controllers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class TableController extends Controller
{
    public function create($name) {

        $tableName = $name;
        $fields = [
            ['name' => 'house_no', 'type' => 'string'],
            ['name' => 'tenant_name', 'type' => 'string'],
            ['name' => 'balance_bf', 'type' => 'float'],
            ['name' => 'actual_rent', 'type' => 'float'],
            ['name' => 'rent_payable', 'type' => 'float'],
            ['name' => 'rent_paid', 'type' => 'float'],
            ['name' => 'water', 'type' => 'float'],
            ['name' => 'new_balance', 'type' => 'float'],
            ['name' => 'tenant_contact', 'type' => 'bigInteger'],
            ['name' => 'accumulated_areas', 'type' => 'float'],
            ['name' => 'business', 'type' => 'string'],

        ];

        return $this->createTable($tableName, $fields);

    }
    public function createTable($tableName, $fields) {
        // laravel check if table is not already exists
        if (!Schema::hasTable($tableName)) {
            Schema::create($tableName, function (Blueprint $table) use ($fields, $tableName) {
                $table->increments('id');
                    foreach ($fields as $field) {
                        $table->{$field['type']}($field['name']);
                    }

                $table->timestamps();
            });

            return response()->json(['message' => 'Given table has been successfully created!'], 200);
        }

        return response()->json(['message' => 'Given table is already exists.'], 400);

    }

    public function removeTable($table_name)
    {
        Schema::dropIfExists($table_name);

        return true;
    }
}
