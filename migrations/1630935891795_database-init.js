/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = pgm => {
    pgm.dropTable('messages', { ifExists: true });
    pgm.dropTable('images', { ifExists: true });
    pgm.dropTable('users', { ifExists: true });

    pgm.createTable('users', {
        id: 'id',
        discordUserId: { type: 'varchar(50)', notNull: true, unique: true },
        discordUserName: { type: 'varchar(250)', notNull: true },
        admin: { type: 'boolean', notNull: true }
    });
    pgm.createIndex('users', 'discordUserId');

    pgm.createTable('images', {
        id: 'id',
        key: { type: 'varchar(1000)' },
        location: { type: 'varchar(1000)', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });

    pgm.createTable('messages', {
        id: 'id',
        type: { type: 'varchar(50)', notNull: true },
        twitter: { type: 'varchar(300)', notNull: true },
        message: { type: 'varchar(280)' },
        image: {
            type: 'integer',
            references: '"images"',
            onDelete: 'cascade',
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        approved: {
            type: 'boolean',
            notNull: true
        }
    });

    pgm.addConstraint('messages', 'chk_null', 'check (message is not null or image is not null)');
};

exports.down = pgm => {};
