export const CarDoc = {
    "/api/v1/cars/create":{
        post:{
            tags:["Cars"],
            security:[
                {
                    token:[]
                }
            ],
            requestBody:{
                content:{
                    "multipart/form-data":{
                        schema:{
                            type:"object",
                            properties:{
                                car_name:{
                                    type:"string",
                                    example:"Sport-L Hybrid",
                                    description:"Car Name",
                                    required:true
                                },
                                plack:{
                                    type:"string",
                                    example:"RAA-350V",
                                    description:"Car licence plate",
                                    required:true
                                },
                                serial_number:{
                                    type:"string",
                                    example:"3 FT BE673 E T R 678452",
                                    description:"vehicle Identification Number",
                                    required:true
                                },
                                manufacture_year:{
                                    type:"string",
                                    example:"2018",
                                    description:"Manufacturer Year",
                                    required:true
                                },
                                car_brand:{
                                    type:"string",
                                    required:true,
                                    example:"Honda",
                                    description:"Car brand",
                                },
                                transmission_type:{
                                    type:String,
                                    description:"Transmission type: Manual or automatic",
                                    example:"Manual",
                                    required:false
                                },
                                fuel_type:{
                                    type:"string",
                                    example:"Diesel",
                                    description:"Fuel type",
                                    required:true
                                },
                                images:{
                                    type:"array",
                                    items:{
                                        type:"file",
                                        description:"Car images"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    content:{
                        "application/json":{
                            type:"object",
                            example:{
                                status:"success",
                                message:"",
                                result:{}
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/v1/cars":{
        get:{
            tags:["Cars"],
            security:[
                {
                    token:[]
                }
            ],
            responses:{
                200:{
                    content:{
                        "application/json":{
                            type:"object",
                            example:{
                                status:"success",
                                message:"",
                                result:[]
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/v1/cars/{carId}":{
        get:{
            tags:["Cars"],
            parameters:[{
                in:"path",
                name:"carId",
                description:"Fetching Car By Id",
                example:"6405a31a2ad56808f4925521"
            }],
            responses:{
                content:{
                    "application/json":{
                        type:"object",
                        exmple:{
                            status:"success",
                            message:"",
                            result:{}
                        }
                    }
                }
            }
        }
    },
    "/api/v1/cars/{updateId}":{
        put:{
            tags:["Cars"],
            parameters:[{
                in:"path",
                name:"updateId",
                description:"Update User",
                example:"6405a31a2ad56808f4925521"
            }],
            requestBody:{
                content:{
                    "multipart/form-data":{
                        schema:{
                            type:"object",
                            properties:{
                                car_name:{
                                    type:"string",
                                    example:"Sport-L Hybrid",
                                    description:"Car Name",
                                    required:true
                                },
                                plack:{
                                    type:"string",
                                    example:"RAA-350V",
                                    description:"Car licence plate",
                                    required:true
                                },
                                serial_number:{
                                    type:"string",
                                    example:"3 FT BE673 E T R 678452",
                                    description:"vehicle Identification Number",
                                    required:true
                                },
                                manufacture_year:{
                                    type:"string",
                                    example:"2018",
                                    description:"Manufacturer Year",
                                    required:true
                                },
                                car_brand:{
                                    type:"string",
                                    required:true,
                                    example:"Honda",
                                    description:"Car brand",
                                },
                                transmission_type:{
                                    type:String,
                                    description:"Transmission type: Manual or automatic",
                                    example:"Manual",
                                    required:false
                                },
                                fuel_type:{
                                    type:"string",
                                    example:"Diesel",
                                    description:"Fuel type",
                                    required:true
                                },
                                rental_cost_per_day:{
                                    type:Number,
                                    description:"Rental cost per day",
                                    example:856.12,
                                    required:true
                                },
                                current_status:{
                                    type:"number",
                                    example:"available",
                                    enum:['available','under_use','under_maintance','sold'],
                                    description:"Current car status",
                                    required:true
                                },
                                images:{
                                    type:"array",
                                    items:{
                                        type:"file",
                                        description:"Car images"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    content:{
                        "application/json":{
                            type:"object",
                            exmple:{
                                status:"success",
                                message:"",
                                result:{}
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/v1/cars/{deleteId}":{
        delete:{
            tags:["Cars"],
            parameters:[{
                in:"path",
                name:"deleteId",
                description:"Car Id for Deletion",
                example:"6405a31a2ad56808f4925521"
            }],
            security:[
                {
                    token:[]
                }
            ],
            responses:{
                200:{
                    content:{
                        "application/json":{
                            type:"object",
                            example:{
                                status:"success",
                                message:""
                            }
                        }
                    }
                }
            }
        }
    },
}