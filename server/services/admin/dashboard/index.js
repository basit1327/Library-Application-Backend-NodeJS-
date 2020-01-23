'use strict';
const _ = require('lodash'),
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function getStats (req,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let data={
				catalog:'',
				ebook:'',
				paper:'',
				users:'',
				admins:''
			};

			let catalogRes = await connection.query(`SELECT count (*) as count FROM catalog where status=1`);
			let ebookRes = await connection.query(`SELECT count (*) as count FROM ebook where status=1`);
			let paperRes = await connection.query(`SELECT count (*) as count FROM paper where status=1`);
			let userCountRes = await connection.query(`SELECT count (*) as count FROM user_account where status!=0`);
			let adminCountRes = await connection.query(`SELECT count (*) as count FROM admin_account where status=1`);

			if ( _.has(catalogRes,'[0].count') ){
				data.catalog = catalogRes[0].count;
			}
			if ( _.has(ebookRes,'[0].count') ){
				data.ebook = ebookRes[0].count;
			}
			if ( _.has(paperRes,'[0].count') ){
				data.paper = paperRes[0].count;
			}
			if ( _.has(userCountRes,'[0].count') ){
				data.users = userCountRes[0].count;
			}
			if ( _.has(adminCountRes,'[0].count') ){
				data.admins = adminCountRes[0].count;
			}

			res.send({status:200,detail:'dashboard stats',data});
		} else {
			res.send({status: 400, detail: 'something went wrong while getting dashboard stats'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while getting dashboard stats'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

module.exports = {
	getStats
};
