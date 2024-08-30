

const Artists = (Sequelize, DataTypes) => {
    const model = Sequelize.define('Artists',
        {
            artist_num: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
              },
              updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
              },
              artist_id: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
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
                allowNull: false,
                defaultValue: 0,
              },
              artist_desc: {
                type: DataTypes.TEXT,
                allowNull: true,
              },
              artist_genre: {
                type: DataTypes.STRING,
                allowNull: true,
              },
            },
            {
              tableName: 'ARTISTS',
              timestamps: false,
              underscored: true,
            }
    );
    return model;
}

module.exports = Artists;