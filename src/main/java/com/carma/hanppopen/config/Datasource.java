package com.carma.hanppopen.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Datasource {

    // app.datasource의 properties들을 injection 해준다
    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public HikariConfig hikariConfig() {
        return new HikariConfig();
    }

    @Bean
    public HikariDataSource hikariDataSource() {
        HikariConfig config = hikariConfig();
        HikariDataSource dataSource = new HikariDataSource(config);
        return dataSource;
    }
}
