const Artists = (Sequelize, DataTypes) => {
    const model = Sequelize.define('Artists',
        {
            artist_num: {
                type:DataTypes.INTEGER,
                primaryKey : true,
                allowNull : false,
                autoIncrement :true,
            },
            artist_id: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            artist_name: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            artist_profile: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            profile_click: {
                type: DataTypes.INTEGER,
                allowNull: true,
            }
        },
        // param3: 모델 옵션 정의
        {
            freezeTableName: true, // 테이블 명 고정
            timestamps: true, // 데이터가 추가되고 수정된 시간을 자동으로 컬럼을 만들어서 기록
        }
    );
    return model;
}

module.exports = Artists;